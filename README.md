# Research Audit Protocols: Duel + MAD

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

The easiest way to run MAD is the web page at **https://tjhavranek.github.io/research-audit-duel-protocol/**. It lays out the four roles, fills each model's role and label into the prompts, and hands you the bundle template. Your document never goes near the page. It runs entirely in your browser, and the only thing it fetches is the protocol file sitting beside it in this repository, so nothing you type or upload is transmitted anywhere. The prompts it copies are read out of [`protocol/ai_mad_protocol_v2.1.md`](protocol/ai_mad_protocol_v2.1.md) when the page loads, so that file is the single source of truth. Edit it and the buttons copy the edited text.

## What it costs you

Running MAD end to end, before the optional Round 3:

| | |
|---|---|
| Accounts | Four, one per model. Free tiers are often enough to start. |
| Model runs | Eight: four in Round 1, four in Round 2. |
| Bundles you assemble by hand | Two, each holding four verbatim outputs. |
| Your attention | One to two hours, mostly spent assembling bundles and on your own verification pass, not writing prompts. |

Duel v1.7 is lighter: two accounts, one long conversation each, no bundles to assemble.

## Available Protocols

### Duel v1.7
Canonical prompt file: [`protocol/ai_duel_protocol_v1.7.md`](protocol/ai_duel_protocol_v1.7.md)

The original protocol. ChatGPT forms an independent view first, then argues it out with Gemini until they converge or fully map their disagreement, then audits itself against the view it wrote before the argument started. It is simpler and faster to run than MAD.

### MAD v2.1
Canonical prompt file: [`protocol/ai_mad_protocol_v2.1.md`](protocol/ai_mad_protocol_v2.1.md)  
Shareable handout: [`protocol/ai_mad_protocol_v2.1.pdf`](protocol/ai_mad_protocol_v2.1.pdf)  
Run it in the browser: <https://tjhavranek.github.io/research-audit-duel-protocol/>

Four models each read your document under a different assigned role, cross-examine each other's output, and a fresh conversation arbitrates.

Version 2.1 fixes what v2.0 got wrong in practice. Criticisms now carry stable IDs, so a model in Round 2 can name the point it is attacking and the arbiter can tell one criticism from four. Severity is defined once and shared by every round instead of being left to each model. Round 3 has a real gate and a one-run limit, because "a genuine unresolved fault line" was not a test anyone could actually apply. Claims that rest on knowledge from outside the document get their own channel, so a missing-literature criticism can be made and then checked rather than trusted on sight. And the protocol now ends with your own verification pass over every quote and every external claim, which v2.0 left implicit. The rest is in the [changelog](CHANGELOG.md).

Version 2.0 stays in the repository at [`protocol/ai_mad_protocol_v2.0.md`](protocol/ai_mad_protocol_v2.0.md) and [`protocol/ai_mad_protocol_v2.0.pdf`](protocol/ai_mad_protocol_v2.0.pdf), because it is the version the Zenodo DOI below minted, exactly as v1.7 stayed in the repository once v2.0 first landed. It is not the current version; use v2.1.

## Which Protocol Should I Use?

Use **Duel v1.7** if:
- you want a faster and simpler workflow
- you are testing an idea, method, or draft at moderate stakes
- you prefer one main orchestrator inside ChatGPT

Use **MAD v2.1** if:
- the question is important and a miss would be costly
- you want multiple independent first-pass critiques
- you want structured cross-examination across several models
- you are auditing a paper, grant proposal, referee report, or research design under serious uncertainty

## Related tools

Two Claude Code skills in separate repositories automate the same discipline. **[`mad-research`](https://github.com/tjhavranek/mad-research)** runs a version of the MAD audit as a single command: three independent role streams, an anonymised cross-critique, and a fresh-context Codex synthesis against a locked rubric, with the full audit trail written to disk, plus an opt-in Bayesian Mode for a specific contested empirical claim. It requires Claude Code and an authenticated Codex CLI. **[`paper-workshop`](https://github.com/tjhavranek/paper-workshop)**, run name CRUCIBLE, goes further: it builds a referee fleet for your specific paper, has rival traditions argue each contested claim, and, opt-in, produces a tracked-changes redline and a clean revision with your own analysis re-run. It requires Claude Code only, no Codex. Both are automation-first extensions of the manual protocols here, not replacements for them; see each repository's own README for prerequisites and limitations.

## How To Use

### Use Duel v1.7

Open ChatGPT Plus/Pro with Agent Mode enabled and copy the full text of [`protocol/ai_duel_protocol_v1.7.md`](protocol/ai_duel_protocol_v1.7.md) into it, replacing the two bracketed lines with your topic and materials. Upload your documents when asked. Agent Mode's ability to log into Gemini for you depends on a browsing feature that changes over time and sometimes fails; when it does, act as the bridge yourself: open Gemini in your own browser, log in, run the same prompt there, and paste each reply back into ChatGPT labelled as Gemini output. Continue until the two models converge or fully map their disagreement, then read the final self-audit ChatGPT produces.

### Use MAD v2.1

The web page is the easiest way to run this: <https://tjhavranek.github.io/research-audit-duel-protocol/>. It lays out the roles, fills each seat's role and label into the prompts, and gives you the bundle template, which is the same shape for both rounds.

To run it by hand, open [`protocol/ai_mad_protocol_v2.1.md`](protocol/ai_mad_protocol_v2.1.md), which has the full operational checklist, the four copy-paste prompts, and the rules for building each round's bundle. In short: send the same document to four models under four different roles for Round 1 and collect their independent assessments, feed all four back to all four for Round 2 cross-examination, run the optional Round 3 only if a specific criticism clears the gate described in the protocol, and finish with a fresh ChatGPT conversation as arbiter. Step 5 is not optional: check every surviving quotation against your own file, open every external source the memo names, redo any arithmetic it leans on, and write down what you accepted and rejected.

PDF is usually the safest source format for document audit, since page references tend to stay stable across models.

## Example

The only worked example in this repository is a **Duel v1.7** run, in [`examples/`](examples/): `maive.pdf` and `waive_ottawa.pdf` as inputs, `AI_duel_results.docx` as the resulting report, for the task

> HOW CAN I IMPROVE THE PROPOSED WAIVE APPROACH?

No MAD run is published in this repository. The MAD workflow is documented through the protocol file and the web page, not through a worked transcript.

## External use

Bob Reed (University of Canterbury) ran the public Duel v1.7 workflow on the WAIVE example and posted his reaction:

> This is brilliant! I love it! Well done, Zuzana and Tomas. I will definitely employ this in my future work. And very easy to implement! I followed your example and got slightly different results (of course).

Two independent runs converging on similar conclusions is not evidence that either one is correct; both could share the same blind spot. What it shows is that the protocol's surface form varies between runs while its substance stays checkable against the source document, which is what it is meant to do.

Links:
- Bob's original comment (MAER-Net): https://www.maer-net.org/post/ai_duel?commentId=0405637a-a4e5-4b40-8498-2fdd496fdad0
- LinkedIn post: https://www.linkedin.com/posts/zuzanairsova_the-adversarial-advantage-ai-duels-for-meta-analysis-activity-7405164271153803265-xZxQ

## Citation

If you use these protocols in your research, please cite:

> Irsova, Z., & Havranek, T. (2026). *Research Audit Protocols: Duel + MAD, v2.0.* GitHub repository. https://doi.org/10.5281/zenodo.19105954

The citation and DOI above cover the archived v2.0 release. The current protocol text is v2.1, in [`protocol/ai_mad_protocol_v2.1.md`](protocol/ai_mad_protocol_v2.1.md). If you specifically want to reference the original two-model workflow, the Duel v1.7 files remain available in this repository too.

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

You are free to use, modify, and redistribute the protocols, including for commercial purposes, as long as you provide appropriate credit to the authors.
