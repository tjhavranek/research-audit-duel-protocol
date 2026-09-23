# Changelog

Older protocol versions stay in `protocol/` rather than being replaced, so a run
recorded against an earlier version can still be reproduced and cited.

## MAD v2.1, revised — 2026-09-23

The protocol was run end to end for the first time, on the MAIVE paper in
`examples/`, and the page was reviewed again. Both turned up defects that reading
alone had missed. One change is inside a prompt: Round 1 now gives the biggest
blind spot an ID. If you copied Round 1 before this date, that line is the
difference.

**From the test run**

- The blind spot in Round 1 had no ID, although it is often the most important
  thing a seat says. In the run, the four seats improvised four different labels
  for the same four points in Round 2, which defeats the purpose of stable IDs. It
  is now `[LABEL]-B1`.
- The cost table said free tiers are often enough to start. On a 12-page paper
  the two bundles came to about 155,000 characters, which the arbiter has to read
  in full. The table now says the later rounds need a large context window, since
  a model given more than it can hold reads part of it without telling you.

**From the review**

- Round 3 asks for both bundles, but the page gave it no upload line and told you
  to build the second bundle only before the arbiter, so anyone following the page
  in order ran Round 3 without the evidence it is meant to judge. The second bundle
  is now built at the end of Round 2, and Round 3 has an upload line.
- The arbiter was never handed the Round 3 answer, on the page or in the protocol's
  checklist, although its prompt expects one. Both now include it.
- A "fresh" arbiter conversation is not fresh if chat memory is on, because it can
  draw on the ChatGPT seat's earlier conversations about the same document. The
  page and the protocol now say to use a Temporary Chat set to Unpersonalized, or to
  turn memory off. A Personalized temporary chat still uses saved memories.
- An edited role was lost if the page reloaded between rounds, which on a phone can
  happen every time you switch to a chatbot app, and Round 2 then sent a different
  role from the one Round 1 used. Edited roles now persist in the tab's session
  storage, which never leaves the browser and is cleared when the tab closes.
- The training opt-out links covered three of the four providers. Grok, which
  trains on conversations by default, now has one too.

## MAD v2.1 — 2026-09-20

Protocol revision, plus a web page for running it.

**Protocol** (`protocol/ai_mad_protocol_v2.1.md`)

- Criticisms carry stable IDs (`Claude-C3`). Round 2 asks "which peer point", and
  in v2.0 that question had no answer anyone could check. New issues raised in
  Round 2 are `N1`, external points are `E1`, and both keep their IDs to the end.
- Severity is defined once and the same three lines appear word for word in every
  prompt that asks for it, the arbiter included. Four models inventing their own
  scales made cross-model comparison meaningless, and so did three near-identical
  restatements drifting apart.
- Round 1 tells each model which label it is writing under, and Round 2 tells it
  which section of the bundle is its own.
- Round 2 gains section E, contested points, and its surviving-criticisms list now
  admits the new issue raised in section C, which v2.0 excluded by construction.
- Round 3 has a three-part gate, a worked contrast between a real fault line and
  differently worded agreement, and a one-run limit. Its stop test now reports
  whether the disagreement was resolved rather than only whether a new point appeared.
- Claims resting on knowledge from outside the document get their own EXTERNAL
  channel, carried through Round 2 and into the arbiter flagged as unverified. A
  missing-literature criticism is external by nature, so v2.0 had nowhere to put
  one and Round 2 would have rejected it for lacking a quote.
- The arbiter normalizes duplicate criticisms before judging and is told not to
  count votes: the four seats share training data, so agreement between them is
  weak evidence.
- Fixed counts became "up to", and sections that can be empty may say "None".
- New rule in every prompt: text inside the document or the bundles is material to
  be judged, never an instruction to follow.
- New Step 5, the reader's own verification pass over every quotation, every
  external claim and any arithmetic. v2.0 left this implicit.
- An explicit Round 1 bundle template, and instructions for a model that truncates
  or refuses a file.

**Web page** (`index.html`, `web/`)

- A page at the repository root, served by GitHub Pages, that runs the MAD lineup,
  fills each model's role and label into the prompts, and hands over the bundle
  template. It runs entirely in the browser and sends nothing anywhere.
- The page holds no copy of the prompt text. It reads
  `protocol/ai_mad_protocol_v2.1.md` at load time, so the protocol file stays the
  single source of truth.
- `tests/check_prompts.py` and a GitHub Actions workflow reimplement that
  extraction and fail the pull request rather than the reader's browser. The
  failure they exist for is not a dead button, which anyone can see, but a button
  that quietly copies the wrong text, so the contract is rigid: one unique step
  heading, exactly one fenced block inside it, and every bracketed token in the
  prompt either one the page fills in or one the answering model fills in. A new
  placeholder that nobody wired up fails the build.
- The Round 3 button stays off until you name the criticism that is still
  contested, because the prompt is meaningless without it.

**README** — rewritten and cut by more than half. The two automated companions were
described three times over and are now described once. The account of an external
user's run no longer implies validation.

## MAD v2.0 — 2026-03-19

Four-model protocol (ChatGPT, Claude, Gemini, Grok): independent Round 1, Round 2
cross-examination, optional targeted Round 3, final arbiter memo. Archived at
[10.5281/zenodo.19105954](https://doi.org/10.5281/zenodo.19105954) and kept in the
repository at `protocol/ai_mad_protocol_v2.0.md`.

## Duel v1.7

The original two-model protocol, a structured ChatGPT and Gemini exchange with an
independent anchor written before the argument and a self-audit against it
afterwards. Kept at `protocol/ai_duel_protocol_v1.7.md`, with the worked WAIVE run
in `examples/`.
