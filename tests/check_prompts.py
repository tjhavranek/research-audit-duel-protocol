#!/usr/bin/env python3
"""Check that the web page can still find, and safely fill, the prompts it copies.

The page keeps no copy of the prompt text. web/site.js reads the protocol file at
load time, anchors on each "## Step N:" heading, and takes the text inside that
section's ```text fence. So an edit to the protocol can break every copy button
without touching a line of the page.

The failure that matters is not a dead button, which the reader can see. It is a
button that quietly copies the wrong text: a second fence added to a step, a
prompt truncated by a stray closing fence, a placeholder renamed so that a model
is told to act as "[ROLE]". This script reimplements the extraction with the same
rigid contract and fails the build on any of those.

Run `python tests/check_prompts.py` from the repository root. No dependencies.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Placeholders the PAGE substitutes. Each must be present, and after substitution
# none may survive. Renaming one in the protocol without renaming it in site.js
# would otherwise ship a prompt with a literal bracket in it.
SUBSTITUTED = {
    1: ["[ROLE]", "[LABEL]"],
    2: ["[ROLE]", "[LABEL]"],
    3: ["[NEW TARGETED ROLE]",
        "[IDENTIFICATION / LITERATURE / LOGIC / CONTRIBUTION / DATA / ETC.]",
        "[CRITICISM ID]"],
    4: [],
}

# Bracketed text the MODEL fills in when it answers. These are part of the output
# format, not placeholders, and the page must leave them alone. Anything bracketed
# that is in neither list is new, and a human has to decide which it is: that is
# the point of listing them rather than matching a pattern.
FORMAT_HINTS = {
    "[High / Medium / Low]",
    "[ID]",
    "[direct quote + page/section]",
    "[quote + page/section]",
    "[quote + page/section, or note that grounding is missing]",
    "[state it]",
}

# A prompt far outside this band means something was truncated or swallowed.
MIN_CHARS, MAX_CHARS = 800, 6000

BRACKETED = re.compile(r"\[[^\]\n]{1,70}\]")

problems = []


def fail(message):
    problems.append(message)


def mad_path():
    """The protocol file site.js actually fetches, read out of site.js itself."""
    js = (ROOT / "web" / "site.js").read_text(encoding="utf-8")
    match = re.search(r'var MAD = "([^"]+)"', js)
    if not match:
        fail('web/site.js no longer declares `var MAD = "..."`.')
        return None
    return match.group(1)


def prompt_from_step(doc, n):
    """The same contract as promptFromStep() in web/site.js."""
    heads = re.findall(r"^## Step %d:.*$" % n, doc, re.M)
    if not heads:
        return None, "no `## Step %d:` heading" % n
    if len(heads) > 1:
        return None, "%d `## Step %d:` headings; the anchor must be unique" % (len(heads), n)

    head = re.search(r"^## Step %d:.*$" % n, doc, re.M)
    rest = doc[head.end():]
    next_head = re.search(r"^## ", rest, re.M)
    section = rest[:next_head.start()] if next_head else rest

    fences = re.findall(r"^```.*$", section, re.M)
    if len(fences) != 2:
        return None, ("the Step %d section has %d fence lines, expected exactly 2 "
                      "(a second code block here would be copied instead)" % (n, len(fences)))
    if not re.fullmatch(r"```text[ \t]*", fences[0]):
        return None, "the Step %d block opens with %r, expected ```text" % (n, fences[0])
    if not re.fullmatch(r"```[ \t]*", fences[1]):
        return None, "the Step %d block closes with %r" % (n, fences[1])

    start = section.index(fences[0]) + len(fences[0])
    end = section.index(fences[1], start)
    text = section[start:end].strip()
    if not text:
        return None, "the Step %d fence is empty" % n
    return text, None


def check_step(n, text):
    for tag in SUBSTITUTED[n]:
        if tag not in text:
            fail("Step %d no longer contains %s, which site.js substitutes."
                 % (n, tag))

    allowed = set(SUBSTITUTED[n]) | FORMAT_HINTS
    for token in sorted(set(BRACKETED.findall(text))):
        if token not in allowed:
            fail("Step %d has an unrecognised bracketed token %s. If the page "
                 "should fill it in, add it to SUBSTITUTED and to web/site.js. "
                 "If the answering model fills it in, add it to FORMAT_HINTS."
                 % (n, token))

    # Simulate what the page copies and confirm no substituted tag survives.
    filled = text
    for tag in SUBSTITUTED[n]:
        filled = filled.replace(tag, "SUBSTITUTED")
    for tag in SUBSTITUTED[n]:
        if tag in filled:
            fail("Step %d still contains %s after substitution." % (n, tag))

    if not MIN_CHARS <= len(text) <= MAX_CHARS:
        fail("Step %d is %d characters, outside the sane band %d-%d. Truncated, "
             "or the fence swallowed something." % (n, len(text), MIN_CHARS, MAX_CHARS))


def main():
    rel = mad_path()
    if rel is None:
        return report()

    path = ROOT / rel
    if not path.is_file():
        fail("web/site.js fetches %s, which does not exist." % rel)
        return report()

    doc = path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")

    for n in sorted(SUBSTITUTED):
        text, why = prompt_from_step(doc, n)
        if text is None:
            fail("Step %d: %s." % (n, why))
            continue
        check_step(n, text)
        print("Step %d: %d characters, %d substituted placeholder(s)."
              % (n, len(text), len(SUBSTITUTED[n])))

    html = (ROOT / "index.html").read_text(encoding="utf-8")

    # A stale protocol filename in the page sends a reader to a file that is gone.
    for name in set(re.findall(r"protocol/ai_mad_protocol_v[\d.]+\.md", html)):
        if name != rel:
            fail("index.html links %s but site.js fetches %s." % (name, rel))

    # Every relative href and src on the page must resolve, including the Duel
    # row's whole-file button.
    refs = set(re.findall(r'(?:href|src|data-whole)="([^"#][^":]*)"', html))
    for ref in sorted(refs):
        if ref.startswith(("http", "mailto:", "./")):
            continue
        if not (ROOT / ref).exists():
            fail("index.html references %s, which does not exist." % ref)

    return report()


def report():
    if problems:
        print("\nFAILED:")
        for p in problems:
            print("  - " + p)
        return 1
    print("\nAll prompts found, and every placeholder accounted for.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
