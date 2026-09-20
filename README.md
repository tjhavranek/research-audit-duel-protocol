# Research Audit Protocols: Duel + MAD

[![Run MAD in your browser](https://img.shields.io/badge/Run%20MAD-in%20your%20browser-4a3f8f?style=for-the-badge)](https://tjhavranek.github.io/research-audit-duel-protocol/)

### ▶ [tjhavranek.github.io/research-audit-duel-protocol](https://tjhavranek.github.io/research-audit-duel-protocol/)

![Duel](https://img.shields.io/badge/Duel-v1.7-blue)
![MAD](https://img.shields.io/badge/MAD-v2.1-purple)
[![mad-research](https://img.shields.io/badge/mad--research-v1.0.1-blue)](https://github.com/tjhavranek/mad-research)
[![paper-workshop](https://img.shields.io/badge/paper--workshop-CRUCIBLE-orange)](https://github.com/tjhavranek/paper-workshop)
![License](https://img.shields.io/badge/license-CC--BY--4.0-green)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.19105954.svg)](https://doi.org/10.5281/zenodo.19105954)

**Authors:** Zuzana Irsova & Tomas Havranek  
Web: https://meta-analysis.cz

---

## Overview

This repository holds two human-in-the-loop adversarial protocols for high-stakes analytical work: peer review of a paper or grant, auditing a methodology, stress-testing a research design.

- **Duel v1.7**: a two-model workflow built around a structured ChatGPT-Gemini exchange.
- **MAD v2.1**: a four-model workflow using ChatGPT, Claude, Gemini, and Grok, with independent first-pass critiques followed by cross-examination.

Both are plain text you copy and paste, and neither needs anything installed.

The page linked above is the easiest way to run MAD. It lays out the four roles, fills each model's role and label into the prompts, and hands you the bundle template. Nothing you type there leaves your browser. Its prompts are read out of [`protocol/ai_mad_protocol_v2.1.md`](protocol/ai_mad_protocol_v2.1.md) as the page loads, so that file is the single source of truth: edit it and the buttons copy the edited text.

## What it costs you

Running MAD end to end, before the optional Round 3:

| | |
|---|---|
| Accounts | Four, one per model. Free tiers are often enough to start. |
| Model runs | Eight: four in Round 1, four in Round 2. |
| Bundles you assemble by hand | Two, each holding four verbatim outputs. |
| Your attention | One to two hours, mostly spent assembling bundles and on your own verification pass, not writing prompts. |

Duel v1.7 is lighter: two accounts, one long conversation each, no bundles to assemble.

## The two protocols

Use **MAD** when a miss would be expensive: a journal revision, a major grant, a job-market paper, a referee report. Use **Duel** when you are testing an idea rather than auditing a finished paper, or when four conversations is more than the question deserves. PDF is the safest source format for either, since page references stay stable across models.

### MAD v2.1 — four models

[`protocol/ai_mad_protocol_v2.1.md`](protocol/ai_mad_protocol_v2.1.md) &middot; [PDF handout](protocol/ai_mad_protocol_v2.1.pdf) &middot; [run it in the browser](https://tjhavranek.github.io/research-audit-duel-protocol/)

Four models each read your document under a different assigned role, cross-examine each other's output, and a fresh conversation arbitrates. Use the page, or work from the protocol file, which has the operational checklist, the four prompts and the bundle rules. In short: send the same document to four models under four different roles for Round 1, feed all four answers back to all four for Round 2 cross-examination, run the optional Round 3 only if a criticism clears the gate, and finish with a fresh ChatGPT conversation as arbiter. Step 5 is not optional: check every surviving quotation against your own file, open every external source the memo names, redo any arithmetic it leans on, and write down what you accepted and rejected.

Version 2.1 fixes what v2.0 got wrong in practice. Criticisms carry stable IDs, so Round 2 can name the point it is attacking. Severity is defined once rather than four times. Round 3 gets a real gate and a one-run limit, because "a genuine unresolved fault line" was not a test anyone could apply. Claims resting on knowledge outside the document get their own channel, so a missing-literature criticism can be checked rather than trusted. And the protocol ends with your own verification pass, which v2.0 left implicit. The rest is in the [changelog](CHANGELOG.md).

Version 2.0 stays in the repository at [`ai_mad_protocol_v2.0.md`](protocol/ai_mad_protocol_v2.0.md) and [`.pdf`](protocol/ai_mad_protocol_v2.0.pdf), because that is what the Zenodo DOI below minted. It is not the current version; use v2.1.

### Duel v1.7 — two models

[`protocol/ai_duel_protocol_v1.7.md`](protocol/ai_duel_protocol_v1.7.md)

ChatGPT forms an independent view first, then argues it out with Gemini until they converge or fully map their disagreement, then audits itself against the view it wrote before the argument started. Copy the whole file into ChatGPT Plus/Pro with Agent Mode, replace the two bracketed lines with your topic and materials, and upload your documents when asked. Agent Mode's ability to log into Gemini for you depends on a browsing feature that changes and sometimes fails. When it does, be the bridge yourself: open Gemini, log in, run the same prompt there, and paste each reply back into ChatGPT labelled as Gemini output.

## Related tools

Two Claude Code skills in separate repositories automate the same discipline. **[`mad-research`](https://github.com/tjhavranek/mad-research)** runs the audit as one command, writing the full trail to disk, with an opt-in Bayesian Mode for a specific contested empirical claim; it needs Claude Code and an authenticated Codex CLI. **[`paper-workshop`](https://github.com/tjhavranek/paper-workshop)**, run name CRUCIBLE, goes further, producing a tracked-changes redline and a clean revision with your own analysis re-run; Claude Code only. Both extend the manual protocols here rather than replacing them. See each repository's README for prerequisites and limitations.

## Example

The only worked example in this repository is a **Duel v1.7** run, in [`examples/`](https://github.com/tjhavranek/research-audit-duel-protocol/tree/main/examples): `maive.pdf` and `waive_ottawa.pdf` as inputs, `AI_duel_results.docx` as the resulting report, for the task

> HOW CAN I IMPROVE THE PROPOSED WAIVE APPROACH?

No MAD run is published in this repository. The MAD workflow is documented through the protocol file and the web page, not through a worked transcript.

## External use

Bob Reed (University of Canterbury) ran the public Duel v1.7 workflow on the WAIVE example and posted his reaction:

> This is brilliant! I love it! Well done, Zuzana and Tomas. I will definitely employ this in my future work. And very easy to implement! I followed your example and got slightly different results (of course).

Two runs converging is not evidence that either is correct, since both could share the same blind spot. What it shows is surface form varying between runs while the substance stays checkable against the source document, which is what the protocol is for.

[Bob's comment on MAER-Net](https://www.maer-net.org/post/ai_duel?commentId=0405637a-a4e5-4b40-8498-2fdd496fdad0) &middot; [LinkedIn post](https://www.linkedin.com/posts/zuzanairsova_the-adversarial-advantage-ai-duels-for-meta-analysis-activity-7405164271153803265-xZxQ)

## Citation

If you use these protocols in your research, please cite:

> Irsova, Z., & Havranek, T. (2026). *Research Audit Protocols: Duel + MAD, v2.0.* GitHub repository. https://doi.org/10.5281/zenodo.19105954

The citation and DOI above cover the archived v2.0 release. The current protocol text is v2.1, in [`protocol/ai_mad_protocol_v2.1.md`](protocol/ai_mad_protocol_v2.1.md). If you specifically want to reference the original two-model workflow, the Duel v1.7 files remain available in this repository too.

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

You are free to use, modify, and redistribute the protocols, including for commercial purposes, as long as you provide appropriate credit to the authors.
