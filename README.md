# Research Audit Protocols: Duel + MAD

![Duel](https://img.shields.io/badge/duel-v1.7-blue)
![MAD](https://img.shields.io/badge/MAD-v2.0-purple)
![License](https://img.shields.io/badge/license-CC--BY--4.0-green)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17898869.svg)](https://doi.org/10.5281/zenodo.17898869)

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

In practice, **Duel** is the lighter protocol and **MAD** is the heavier audit protocol.

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

6. Run **Round 3 only if needed**, that is, only when Round 2 leaves a genuine unresolved fault line.

7. Use **ChatGPT as the final arbiter** to synthesize the surviving criticisms, rejected points, minority report, and action list.  
   For the cleanest setup, use ChatGPT as the judge in a **fresh conversation**, or reserve it for the arbiter role only.

**Practical note.** Free versions of some models can be sufficient, especially for exploratory use. But users should expect stricter upload limits, smaller context windows, usage caps, and occasional missing file support. For high-stakes work, paid versions are usually more reliable.

**File-format note.** For document audit, PDF is often the safest source format because page references are more stable across models.

---

## Example

A worked example using MAIVE and WAIVE is available in the [`examples/`](examples/) folder.  
It shows the full **Duel v1.7** run for the task:

> HOW CAN I IMPROVE THE PROPOSED WAIVE APPROACH?

with `maive.pdf` and `waive_ottawa.pdf` as inputs and `AI_duel_results.docx` as the resulting audit report.

At present, the public worked example illustrates the **duel** workflow. The **MAD** workflow is currently documented through the protocol files in the [`protocol/`](protocol/) folder.

---

## Independent Replication (External Use)

The protocol has been independently implemented by external researchers.

For example, Prof. Bob Reed (University of Canterbury) applied the public **Duel v1.7** workflow following the WAIVE example and reported successful execution:

> “This is brilliant! I love it! Well done, Zuzana and Tomas. I will definitely employ this in my future work. And very easy to implement!
> I followed your example and got slightly different results (of course). I then asked ChatGPT to compare my final report with yours and this is what it said (spoiler alert: it strengthens the value of your protocol):
>
> *The two reports are substantively the same, with only minor stylistic differences. Their convergence is strong evidence that:*
> - *the key weaknesses of WAIVE have been correctly identified,*
> - *the improvement path is coherent and defensible,*
> - *and the final conclusions are not an artifact of one AI's reasoning style.*”

This illustrates an intended feature of the protocol: independent runs may differ in surface form while converging on the same substantive conclusions.

Note: the "open Gemini inside ChatGPT" step depends on the current Agent/browser environment. If it fails in a given setup, you can run the same duel by manually copy-pasting between models (human-in-the-loop) without changing the adversarial structure.

Links:
- Bob's original comment (MAER-Net): https://www.maer-net.org/post/ai_duel?commentId=0405637a-a4e5-4b40-8498-2fdd496fdad0
- LinkedIn post: https://www.linkedin.com/posts/zuzanairsova_the-adversarial-advantage-ai-duels-for-meta-analysis-activity-7405164271153803265-xZxQ

---

## Citation

If you use the **Duel v1.7** workflow, please cite:

> Irsova, Z., & Havranek, T. (2025). *Research Audit Protocol (ChatGPT--Gemini Duel), v1.7.* GitHub repository. https://github.com/tjhavranek/research-audit-duel-protocol

The DOI shown in the badge above currently corresponds to the public **Duel v1.7** release:

**10.5281/zenodo.17898869**

If you use **MAD v2.0** before a separate tagged release/DOI is created, please cite the repository and specify explicitly that you used:

> `protocol/ai_mad_protocol_v2.0.md`

Once a separate public release is created for MAD v2.0, the citation metadata should be updated accordingly.

---

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

You are free to use, modify, and redistribute the protocols, including for commercial purposes, as long as you provide appropriate credit to the authors.
