# Research Audit Protocols: Duel + MAD

![Duel](https://img.shields.io/badge/Duel-v1.7-blue)
![MAD](https://img.shields.io/badge/MAD-v2.0-purple)
[![mad-research](https://img.shields.io/badge/mad--research-v1.0.1-blue)](https://github.com/tjhavranek/mad-research)
[![paper-workshop](https://img.shields.io/badge/paper--workshop-CRUCIBLE-orange)](https://github.com/tjhavranek/paper-workshop)
![License](https://img.shields.io/badge/license-CC--BY--4.0-green)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.19105954.svg)](https://doi.org/10.5281/zenodo.19105954)

**Authors:** Zuzana Irsova & Tomas Havranek  
Web: https://meta-analysis.cz

---

## Overview

This repository contains **human-in-the-loop adversarial workflows** for high-stakes analytical work, such as:

- Peer review of academic papers  
- Auditing complex methodologies  
- Stress-testing research designs  
- Research design critique under uncertainty  

The protocols are designed for practical use by researchers who want **structured disagreement across frontier AI models**, while keeping the human fully in control of the process.

The repository currently includes **two related protocols**:

1. **Duel v1.7** -- a two-model workflow centered on a structured ChatGPT--Gemini adversarial exchange  
2. **MAD v2.0** -- a four-model workflow using ChatGPT, Claude, Gemini, and Grok in a structured multi-agent debate

Both protocols prioritize clarity, accessibility, and evidence-grounded critique over heavy automation.

An **automated companion** for users who want a code-free but
script-driven version of the same workflow lives in a separate
repository: **[`tjhavranek/mad-research`](https://github.com/tjhavranek/mad-research)**.
It is a family of three Claude Code skills (`codex-bridge`,
`mad-build`, and `mad-research`) whose audit skill automates the
same independent-critique, synthesis, and minority-report
discipline, with an opt-in **Bayesian Mode** for evaluating a
specific contested empirical claim; the full feature list is under
**Available Protocols** below. Duel v1.7 and MAD v2.0 remain the
stable manual protocols here; `mad-research` automates the audit, and
a further Claude-only successor -- **[`paper-workshop`](https://github.com/tjhavranek/paper-workshop)**,
run name **CRUCIBLE** -- goes beyond auditing to argue a paper from
rival schools and then, opt-in, rebuild it. Both `mad-research` and
`paper-workshop` are automation-first extensions, not replacements.

---

## Available Protocols

### 1. Research Audit Protocol (ChatGPT--Gemini Duel) v1.7
Canonical prompt file: [`protocol/ai_duel_protocol_v1.7.md`](protocol/ai_duel_protocol_v1.7.md)

This is the original public protocol. It is simpler, faster, and easier to run if you want a focused adversarial exchange between two strong models.

### 2. Research Audit Protocol (4-Model MAD) v2.0
Canonical prompt file: [`protocol/ai_mad_protocol_v2.0.md`](protocol/ai_mad_protocol_v2.0.md)  
Shareable handout: [`protocol/ai_mad_protocol_v2.0.pdf`](protocol/ai_mad_protocol_v2.0.pdf)

This is the extended protocol for **high-stakes document audit** using four major models:
- ChatGPT  
- Claude  
- Gemini  
- Grok  

It is more demanding to run, but it provides broader stress-testing and more structured cross-examination.

### 3. Claude+Codex automated companion (`mad-research`) -- separate repo
Repo: <https://github.com/tjhavranek/mad-research>

A Claude Code skill family for users who have Claude Code and
authenticated Codex CLI access. The repo includes `codex-bridge`
for one-shot Codex calls, `mad-build` for staged draft/build
collaboration, and `mad-research` for research-document audits.
The audit path runs three independent role streams, anonymized
Round 2 cross-critique with a packet-level prompt-injection guard,
and fresh-context Codex synthesis against a locked rubric; the
final memo preserves a minority report, separates rejected points,
includes a trajectory ledger for surviving criticisms, and must
disclose stream effectiveness and model-family independence.
Opt-in **Bayesian Mode** adds explicit prior / evidence /
posterior discipline when the question is "is this empirical
claim actually true?" rather than "is this methodology sound?";
the posterior it produces is a structured stance, not a
calibrated probability. No code to write; the user invokes
everything in natural language.

`mad-research` is an automation-first extension of the manual
MAD v2.0 workflow, not a replacement for it. The manual protocol
remains the right tool when you want broad coverage across four
frontier models (ChatGPT + Claude + Gemini + Grok) or when you want
the human-in-the-loop discipline of Duel/MAD copy-paste. See the
[`mad-research`](https://github.com/tjhavranek/mad-research) repository's
README for prerequisites, install, and a worked WAIVE example.

### 4. Claude-only argue-and-rebuild workshop (`paper-workshop` / CRUCIBLE) -- separate repo
Repo: <https://github.com/tjhavranek/paper-workshop>

A Claude Code skill (Claude-only; runs on any paid plan) that goes
beyond a critique memo to a worked rebuild. For your specific
manuscript it assembles a fleet of referee subagents and makes them
**argue** -- every contested claim is taken up by experts from at
least two rival traditions, one to break it and one to defend it --
with every criticism pinned to an exact quote by a deterministic gate
and re-checked by independent verifiers. Then,
opt-in, it **rebuilds** the paper: a tracked-changes redline, a clean
revised version, and a re-run of your own analysis code under the rule
that no number enters the paper unless a logged re-run produced it,
plus a replication package. Depth is selectable from a light Desk
Review up to an exhaustive Summit; it works on copies and asks for
your sign-off before anything touches a number or a claim.

`paper-workshop` is the project's own self-described successor to the
manual Duel/MAD protocols and to `mad-research`: it inherits their
discipline (a locked severity rubric, quote-and-locate grounding, a
preserved minority report, no confidence scores, read-only treatment
of your files) and adds the topic-adapted debating fleet and the
rebuild. It is the most advanced member of the family, not a
replacement for the manual protocols here, and it is honestly scoped:
effectiveness is not yet measured, and the rebuild has been
demonstrated end-to-end once, on an accepted paper from the authors'
own group. See the
[`paper-workshop`](https://github.com/tjhavranek/paper-workshop)
repository's README and its `LIMITATIONS.md` for the full feature list
and the honest limits.

---

## Which Protocol Should I Use?

Use **Duel v1.7** if:
- you want a faster and simpler workflow  
- you are testing an idea, method, or draft at moderate stakes  
- you prefer one main orchestrator inside ChatGPT  

Use **MAD v2.0** if:
- the question is important and a miss would be costly  
- you want multiple independent first-pass critiques  
- you want structured cross-examination across several frontier models  
- you are auditing a paper, grant proposal, referee report, or research design under serious uncertainty  

Use **[`mad-research`](https://github.com/tjhavranek/mad-research)** if:
- you already use Claude Code and have authenticated Codex CLI access
- you want the audit to run as a single natural-language command rather than copy-paste between web UIs
- you want the audit trail (drafts, cross-critiques, rejected points, minority report, trajectory ledger) saved on disk automatically
- you are stress-testing a specific contested empirical claim and want explicit prior / evidence / posterior discipline (opt-in Bayesian Mode; the posterior is a structured stance, not a calibrated probability)
- you are comfortable trading the four-model coverage of MAD v2.0 for the two-provider Claude+Codex automation

Use **[`paper-workshop` / CRUCIBLE](https://github.com/tjhavranek/paper-workshop)** if:
- you want not just a critique but an implemented revision -- a tracked redline and a clean draft with your own numbers re-run before you submit
- you want a referee fleet built for your specific paper that argues each contested claim from rival schools, rather than a fixed model lineup
- you already use Claude Code (it is Claude-only; no Codex or other-model access needed)
- you accept that this is the newest and least-validated of the four -- the rebuild has been demonstrated end-to-end once, not broadly validated (see its repository's `LIMITATIONS.md`)

In practice the four run from lightest to heaviest and from critique to
rebuild: **Duel** is the lightest manual audit, **MAD** the heaviest
manual audit, **mad-research** the automated audit memo, and
**paper-workshop / CRUCIBLE** goes furthest -- it argues the paper and
then, opt-in, rebuilds it. The first three tell you what is wrong;
CRUCIBLE argues it out and then helps you fix it.

---

## How To Use

### A. Use Duel v1.7

1. Open **ChatGPT Plus/Pro** with Agent Mode (browsing/tools enabled).  
2. Copy the full text from [`protocol/ai_duel_protocol_v1.7.md`](protocol/ai_duel_protocol_v1.7.md).  
3. Paste it into ChatGPT, replacing the bracketed placeholders with your topic and list of materials.  
4. Upload your documents (papers, data, code) to ChatGPT as instructed.  
5. Follow the Agent's instructions to:
   - log in to Gemini yourself when asked,
   - copy Gemini's replies back into ChatGPT,
   - continue the duel until either verified consensus or irreducible disagreement is reached.  
6. At the end, read the final self-audit and report produced by ChatGPT.

### B. Use MAD v2.0

1. Open the four models you want to use:
   - ChatGPT
   - Claude
   - Gemini
   - Grok  

2. Copy the prompts from [`protocol/ai_mad_protocol_v2.0.md`](protocol/ai_mad_protocol_v2.0.md).

3. Upload the same source document or problem to each model for **Round 1**, assigning a different role to each model.

4. Run **independent first-pass assessments** in parallel.

5. Collect those Round 1 outputs and feed them back to all models for **Round 2 cross-examination**.

6. **Round 3 is optional** and should be used only when Round 2 leaves a genuine unresolved fault line.

7. Use **ChatGPT as the final arbiter** to synthesize the surviving criticisms, rejected points, minority report, and action list.  
   For the cleanest setup, either reserve ChatGPT for the arbiter role only or use a **fresh conversation** for the final synthesis.

**Practical note.** Free versions of some models can be sufficient, especially for exploratory use. But users should expect stricter upload limits, smaller context windows, usage caps, and occasional missing file support. For high-stakes work, paid versions are usually more reliable.

**File-format note.** For document audit, PDF is often the safest source format because page references are more stable across models.

---

## Example

A worked example using MAIVE and WAIVE is available in the [`examples/`](examples/) folder.  
It shows the full **Duel v1.7** run for the task:

> HOW CAN I IMPROVE THE PROPOSED WAIVE APPROACH?

with `maive.pdf` and `waive_ottawa.pdf` as inputs and `AI_duel_results.docx` as the resulting audit report.

At present, the public worked example illustrates the **Duel** workflow. The **MAD** workflow is currently documented through the protocol files in the [`protocol/`](protocol/) folder.

---

## Independent Replication (External Use)

The protocol has been independently implemented by external researchers.

For example, Prof. Bob Reed (University of Canterbury) applied the public **Duel v1.7** workflow following the WAIVE example and reported successful execution:

> This is brilliant! I love it! Well done, Zuzana and Tomas. I will definitely employ this in my future work. And very easy to implement!
> I followed your example and got slightly different results (of course). I then asked ChatGPT to compare my final report with yours and this is what it said (spoiler alert: it strengthens the value of your protocol):
>
> *The two reports are substantively the same, with only minor stylistic differences. Their convergence is strong evidence that:*
> - *the key weaknesses of WAIVE have been correctly identified,*
> - *the improvement path is coherent and defensible,*
> - *and the final conclusions are not an artifact of one AI's reasoning style.*

This illustrates an intended feature of the protocol: independent runs may differ in surface form while converging on the same substantive conclusions.

Note: the "open Gemini inside ChatGPT" step depends on the current Agent/browser environment. If it fails in a given setup, you can run the same duel by manually copy-pasting between models (human-in-the-loop) without changing the adversarial structure.

Links:
- Bob's original comment (MAER-Net): https://www.maer-net.org/post/ai_duel?commentId=0405637a-a4e5-4b40-8498-2fdd496fdad0
- LinkedIn post: https://www.linkedin.com/posts/zuzanairsova_the-adversarial-advantage-ai-duels-for-meta-analysis-activity-7405164271153803265-xZxQ

---

## Citation

If you use these protocols in your research, please cite:

> Irsova, Z., & Havranek, T. (2026). *Research Audit Protocols: Duel + MAD, v2.0.* GitHub repository. https://doi.org/10.5281/zenodo.19105954

If you specifically want to reference the original two-model workflow as a historical version, the **Duel v1.7** files remain available in this repository.

---

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

You are free to use, modify, and redistribute the protocols, including for commercial purposes, as long as you provide appropriate credit to the authors.
