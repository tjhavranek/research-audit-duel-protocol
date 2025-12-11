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

## Citation

If you use this protocol in your research, please cite:

> Irsova, Z., & Havranek, T. (2025). *Research Audit Protocol (ChatGPT–Gemini Duel), v1.7.* GitHub repository. https://github.com/tjhavranek/research-audit-duel-protocol

You can also cite the DOI shown in the badge above: **10.5281/zenodo.17898869**.

---

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

You are free to use, modify, and redistribute the protocol, including for commercial purposes, as long as you provide appropriate credit to the authors.
