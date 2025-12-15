# Research Audit Protocol (ChatGPT–Gemini Duel) v1.7

![Version](https://img.shields.io/badge/version-1.7-blue)
![License](https://img.shields.io/badge/license-CC--BY--4.0-green)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17898869.svg)](https://doi.org/10.5281/zenodo.17898869)

**Authors:** Zuzana Irsova & Tomas Havranek  
Web: https://meta-analysis.cz

---

## Overview

The **Research Audit Protocol** is a human-in-the-loop adversarial workflow for high-stakes analytical work, such as:

- Peer review of academic papers  
- Auditing complex methodologies  
- Stress-testing research designs  

It coordinates two LLMs (**ChatGPT** and **Google Gemini**) under human supervision to obtain deeper, more reliable conclusions than either model can produce alone. The structure draws on principles from multi-agent debate and adversarial evaluation, adapted for practical use in academic research.

The protocol prioritizes clarity, accessibility, and agent compatibility over heavy automation. Advanced users may substitute other models (e.g., Claude) for the "Auditor" role or implement this pattern within multi-agent frameworks such as LangGraph, AutoGen, or CrewAI.

---

## How To Use

1. Open **ChatGPT Plus/Pro** with Agent Mode (browsing/tools enabled).  
2. Copy the full text from `protocol/ai_duel_protocol_v1.7.md`.  
3. Paste it into ChatGPT, replacing the bracketed placeholders with your topic and list of materials.  
4. Upload your documents (papers, data, code) to ChatGPT as instructed.  
5. Follow the Agent's instructions to:
   - Log in to Gemini yourself when asked,
   - Copy Gemini's replies back into ChatGPT,
   - Continue the duel until either verified consensus or irreducible disagreement is reached.
6. At the end, read the final self-audit and report produced by ChatGPT.

---

## Example

A worked example using MAIVE and WAIVE is available in the [`examples/`](examples/) folder.  
It shows the full duel run for the task:

> HOW CAN I IMPROVE THE PROPOSED WAIVE APPROACH?

with `maive.pdf` and `waive_ottawa.pdf` as inputs and `AI_duel_results.docx` as the resulting audit report.

---

## Independent Replication (External Use)

The protocol has been independently implemented by external researchers.

For example, Prof. Bob Reed (University of Canterbury) applied the protocol following the public WAIVE example and reported successful execution:

> “This is brilliant! I love it! Well done, Zuzana and Tomas. I will definitely employ this in my future work. And very easy to implement!
> I followed your example and got slightly different results (of course). I then asked ChatGPT to compare my final report with yours and this is what it said (spoiler alert: it strengthens the value of your protocol):
>
> *The two reports are substantively the same, with only minor stylistic differences. Their convergence is strong evidence that:*
> – *the key weaknesses of WAIVE have been correctly identified,*
> – *the improvement path is coherent and defensible,*
> – *and the final conclusions are not an artifact of one AI's reasoning style.*”

This illustrates an intended feature of the protocol: independent runs may differ in surface form while converging on the same substantive conclusions.

Note: the “open Gemini inside ChatGPT” step depends on the current Agent/browser environment. If it fails in a given setup, you can run the same duel by manually copy–pasting between models (human-in-the-loop) without changing the adversarial structure.

Links:
- Bob’s original comment (MAER-Net): https://www.maer-net.org/post/ai_duel?commentId=0405637a-a4e5-4b40-8498-2fdd496fdad0
- LinkedIn post: https://www.linkedin.com/posts/zuzanairsova_the-adversarial-advantage-ai-duels-for-meta-analysis-activity-7405164271153803265-xZxQ

---

## Citation

If you use this protocol in your research, please cite:

> Irsova, Z., & Havranek, T. (2025). *Research Audit Protocol (ChatGPT–Gemini Duel), v1.7.* GitHub repository. https://github.com/tjhavranek/research-audit-duel-protocol

You can also cite the DOI shown in the badge above: **10.5281/zenodo.17898869**.

---

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

You are free to use, modify, and redistribute the protocol, including for commercial purposes, as long as you provide appropriate credit to the authors.
