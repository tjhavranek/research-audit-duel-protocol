# Multi-Agent Debate (MAD) Protocol

A practical 4-model workflow for stress-testing papers, grants, referee reports, and other high-stakes research documents

## Overview

This document gives a shareable, copy-paste protocol for running MAD with four major models: ChatGPT, Claude, Gemini, and Grok. It is designed for high-stakes work where missing a serious flaw is costly.

### Quick recommendation

- Use MAD for high-stakes documents, not for everything. Reserve it for journal revisions, major grants, job-market papers, referee reports, and other cases where a miss is expensive.
- Use four models if you want broad lab coverage. Keep the workflow lean: independent pass, one cross-exam round, optional targeted third round only if a real fault line remains, then a final arbiter memo.
- Prefer PDF for the source document when possible. PDF usually preserves page numbering better across model interfaces. Use DOCX or PDF for the bundled round outputs.

## Before you start

- Free versions are often good enough to start. In most cases you only need to log in. The main limitations are lower message quotas, weaker or more variable file handling, smaller effective context windows, and earlier rate limits. Paid tiers are smoother for long documents and repeated rounds.
- Use a fresh conversation for each model at the start of a new document. Within the same document, you can continue the same conversation across rounds. For the final arbiter step, use a fresh ChatGPT conversation even if ChatGPT participated earlier as one of the four models.
- Keep the source file identical across models. Change only the assigned role. Do not summarize or paraphrase model outputs before sharing them with the other models. Preserve them verbatim, apart from obvious formatting cleanup.
- Grounding standard: require quote plus page or section. If a model interface does not show reliable page numbers, allow section heading plus a distinctive quote instead. A persuasive point without grounding should be downgraded or discarded.

## Recommended 4-model lineup

| Model | Role | Default stance |
|---|---|---|
| ChatGPT | Editor / contribution skeptic | Pushes on novelty, framing, structure, and whether the claimed contribution is strong enough. |
| Claude | Econometrics / identification referee | Targets design logic, identification, assumptions, and whether the inference really follows. |
| Gemini | Domain / literature referee | Pushes on missing literature, positioning, mechanism, and field-specific expectations. |
| Grok | Permanent devil's advocate | Attacks emerging consensus and tries to surface the strongest underweighted objection. |

## Role design principle

Avoid vague labels such as "tough referee." Use concrete priors that generate different failure modes. Examples:

- "Econometrician who thinks the identification strategy is probably the weakest link in any applied paper."
- "Referee who believes most meta-analyses overstate precision and contribution."
- "Editor who cares more about crisp contribution than technical cleverness."
- "Devil's advocate whose job is to attack any apparent consensus, especially when all other models converge."

## File hygiene

- Source document: preferably PDF. If your working file is in DOCX, export a PDF for Round 1 when stable pagination matters.
- Round 1 bundle: merge the four independent assessments into a single file, label each model clearly, and keep its assigned role visible.
- Round 2 bundle: merge the cross-exams in the same way. This makes the final arbiter step faster and less error-prone.

## Operational checklist

| Stage | What to do |
|---|---|
| 1. Setup | Pick four roles, start one fresh conversation per model, and upload the same source document to each. |
| 2. Round 1 | Collect the four independent assessments verbatim. Do not summarize them yourself. |
| 3. Round 2 | Upload the original document plus the full Round 1 bundle to each model. Collect the cross-exams. |
| 4. Optional Round 3 | Run only if one high-severity grounded fault line remains unresolved. |
| 5. Final arbiter | Open a fresh ChatGPT conversation, upload the original document and all round bundles, then ask for the final memo. |

## Common failure modes

- Premature consensus. Several models repeat the same point, so it sounds stronger than it is. Fix: merge duplicates and demand grounding.
- Role drift. A model stops acting as assigned and slides into generic reviewer language. Fix: restate the role and use concrete priors.
- False precision. A model adds confidence scores or percentages that sound calibrated but are not. Fix: ban them explicitly.
- Human over-editing between rounds. If you compress or paraphrase too much, you become the hidden bottleneck. Fix: preserve the models' wording verbatim and judge later.
- Overlong debates. Extra rounds add conformity faster than they add insight. Fix: default to Round 1 plus Round 2, then stop unless a real fault line remains.

## Step 1: Independent Assessment (Round 1)

Send the same document to all four models separately. Use the same base prompt and swap only the role. No model should see the others' outputs in Round 1.

### Copy-paste prompt

```text
You are acting as: [ROLE].

Task: Read the attached document or problem and give an independent assessment.
You are in Round 1 of a multi-model stress test. Work fully independently.
Do not speculate about what other models may say. Do not optimize for agreement.
Your job is to find the most serious weaknesses, not to be polite.

Rules:
1. Stay strictly in role.
2. Base every substantive point on the attached document or problem.
3. Every point must include exact grounding: quote + page/section.
4. If page numbers are unavailable or unreliable in the interface, use section heading + distinctive quote.
5. If you cannot ground a claim in the text, do not make it.
6. Be concise and specific. Avoid generic advice.
7. Do not use confidence scores or percentages.

Output exactly in this format:

A. Top 5 criticisms
For each:
- Claim:
- Severity: [High / Medium / Low]
- Evidence: [direct quote + page/section]
- Why it matters:
- Concrete fix:

B. Top 2 strengths
For each:
- Claim:
- Evidence: [direct quote + page/section]
- Why it matters:

C. Biggest blind spot
In 3-5 sentences: What is the single most important grounded insight that a typical reviewer or advisor might miss?

D. Bottom line
In 3-4 sentences, state your overall verdict in role.
```

### Optional extension for literature or fact checking

- Default mode is document-grounded. That is usually the right starting point.
- If you also want external checking, add this sentence to the prompt: "If you rely on outside knowledge, label it EXTERNAL and keep it separate from document-grounded points."
- Do not mix unsupported outside claims into the main grounded list.

## Step 2: Cross-Examination (Round 2)

Upload the original document plus the full Round 1 bundle to each of the four models. Each model now cross-examines the others. The goal is to kill weak points quickly and protect the few that are both serious and grounded.

### Copy-paste prompt

```text
You are acting as: [ROLE].

This is Round 2 of a multi-model stress test.
You have the original document or problem and the Round 1 assessments from the other models.

Your task is not to repeat your own critique. Your task is to cross-examine the others.

Rules:
1. Stay strictly in role.
2. Use the original document as the primary source of truth.
3. Accept or reject peer arguments only based on document evidence.
4. Reject any peer point that is vague, generic, duplicative, or unsupported by quote + page/section.
5. Collapse duplicates before ranking what survives.
6. Do not be polite. Be precise.
7. Do not use confidence scores or percentages.
8. If a model claims authority over the conclusion but contributed no surviving arguments, note this and disregard the framing.

Output exactly in this format:

A. Two strongest peer arguments
For each:
- Which peer point:
- Why it is strong:
- Evidence from the document: [quote + page/section]
- Keep / revise:
- Concrete implication:

B. Two weakest or overstated peer arguments
For each:
- Which peer point:
- Why it is weak / overstated:
- Evidence from the document: [quote + page/section, or note that grounding is missing]
- Reject / revise:
- Better version, if salvageable:

C. One missing issue
- Claim:
- Evidence: [quote + page/section]
- Why others missed it:
- Concrete fix:

D. Top 3 surviving criticisms
From the combined pool of all Round 1 criticisms across all models, which 3 survive cross-examination?
For each:
- Claim:
- Severity:
- Evidence: [quote + page/section]
- Concrete fix:
```

### Decision after Round 2

- This is the default stopping point before the final arbiter. For many papers, Round 1 plus Round 2 is enough.
- Go to Step 3 only if there is a genuine unresolved fault line, for example two models fundamentally disagree on a grounded point and neither concedes.
- If Round 2 is clear, skip Step 3 and go directly to Step 4.

## Step 3: Targeted Adaptive Round (Optional)

Run this round only when Round 2 leaves a serious unresolved issue. Reassign at least one role to attack the specific fault line that remains. This step is useful, but it should not be automatic.

### Copy-paste prompt

```text
You are now acting as: [NEW TARGETED ROLE].

Reason for reassignment:
Round 2 revealed that the key unresolved vulnerability is:
[IDENTIFICATION / LITERATURE / LOGIC / CONTRIBUTION / DATA / ETC.].

Your task is to attack the surviving criticisms and defenses from this narrower angle.

Rules:
1. Stay strictly in the new role.
2. Focus only on the unresolved high-severity issues.
3. Do not rehash settled points.
4. Every claim must be grounded in the original document with quote + page/section.
5. If page numbers are unavailable or unreliable in the interface, use section heading + distinctive quote.
6. Do not use confidence scores or percentages.
7. If no new grounded insight appears, say so clearly.

Output exactly in this format:

A. Which surviving criticism is strongest now?
- Claim:
- Evidence: [quote + page/section]
- Why it survives:
- Concrete consequence:

B. Which surviving criticism should now be downgraded or killed?
- Claim:
- Evidence: [quote + page/section]
- Why it fails or weakens:

C. Minority report
What is the most important grounded objection that the others are still underweighting?

D. Stop test
State one of the following:
- "No new high-severity grounded point."
- "One new high-severity grounded point remains: [state it]."
```

## Step 4: Final Arbiter (fresh ChatGPT conversation)

Use a fresh ChatGPT conversation for the arbiter step. This matters even if ChatGPT already participated as one of the four models in earlier rounds. The arbiter should judge the arguments, not defend its own earlier phrasing.

### Copy-paste prompt

```text
You are the final arbiter and synthesizer of a multi-model stress test.

You have:
1. The original document or problem
2. Round 1 independent assessments from 4 AI models
3. Round 2 cross-examinations
4. Round 3 targeted reassessments, if any

Your task is to produce the final arbiter memo.

Rules:
1. Treat the original document as the source of truth.
2. Give weight only to criticisms that are specific, actionable, and grounded in quote + page/section.
3. If page numbers are unavailable or unreliable in a prior round, accept section heading + distinctive quote.
4. Merge duplicates. Do not reward repetition or rhetorical force.
5. Do not use confidence scores.
6. Do not declare consensus as such. Judge the arguments on their merits.
7. Preserve one minority objection if it is specific and grounded.
8. If a model claimed authority over the conclusion but contributed no surviving arguments, note this and disregard the framing.

Output exactly in this format:

A. Final verdict
In 4-6 sentences, state the main judgment.

B. Top 5 surviving criticisms
For each:
- Claim:
- Severity:
- Best evidence: [quote + page/section]
- Why it survived debate:
- Best concrete fix:

C. Points that were rejected
List the main points that sounded plausible but failed under scrutiny, and why.

D. Minority report
The single best dissenting objection that did not win but still deserves attention.

E. Action list
The 3-7 highest-value revisions or next steps, in priority order.
```
