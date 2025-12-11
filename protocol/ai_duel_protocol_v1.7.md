# RESEARCH AUDIT PROTOCOL v1.7

Designed by **Zuzana Irsova** (irsova.com) and **Tomas Havranek** (meta-analysis.cz).  
Replace bracketed text, activate Agent Mode, and execute.

This protocol is designed for high-stakes analytical work: peer review, research design, complex methodological evaluation, and auditing reasoning under uncertainty. It coordinates two LLMs (ChatGPT + Gemini) under human supervision to obtain deeper, more reliable conclusions than either model can produce alone. The structure draws on principles from multi-agent debate and adversarial evaluation, adapted for practical use in academic research.

**Note.** This protocol represents one effective approach among several possible designs. It prioritizes clarity, accessibility, and agent compatibility over complexity or heavy automation. Advanced users may substitute Claude for the "Auditor" role to leverage its strong reasoning capabilities, or automate this adversarial pattern using multi-agent orchestration frameworks such as LangGraph, AutoGen, or CrewAI. This version is optimized for wide usability without coding dependencies.

**Warning.** This protocol pushes current Agent capabilities to their limits. If the Agent stalls, you may need to intervene or perform the copy--paste steps manually.

**Technical Requirements.** This protocol requires ChatGPT Plus/Pro with Agent Mode. Agents cannot reliably complete interactive authentication steps (such as Google account login, SSO prompts, or two-factor challenges), so login must always be handled by the user. If automated interaction with Gemini is not possible or the Agent fails to log in (which sometimes happens unpredictably), you must act as the human bridge:

- Open Gemini in your own browser.  
- Log in with your institutional account.  
- Run the same prompt there.  
- Paste Gemini’s full reply back into ChatGPT clearly labeled as Gemini output.

Always tell ChatGPT that the text comes from a competing model, ask it what follow-up questions or challenges to send to Gemini, return those questions to Gemini manually, and repeat the copy--paste loop until the models either converge or fully map their disagreement. If you paste a message that might be Gemini output but is not clearly labeled as such, ChatGPT should first ask you to clarify its source before incorporating it into the duel.

---

## Task

I need a deep, high-quality analysis of the following topic:

> \[INSERT TOPIC / QUESTION / PAPER / METHOD / PROBLEM\]

I am attaching the following materials:

> \[LIST OF DOCUMENTS, DATA, LINKS\]

---

## 1. Read all attached materials with maximal thoroughness

- Understand every word, concept, equation, assumption, and argument.  
- If something is unclear, slow down and resolve it before continuing.

---

## 2. Form your own expert assessment first

Label this section clearly as: **"Step 2: Independent Anchor"**.

Provide your best independent evaluation *before* seeing Gemini's views. Include:

- strongest points  
- weaknesses and potential errors  
- hidden assumptions  
- edge cases and failure modes  
- open questions a top referee would ask  

Produce the best expert view you can, as if writing for a top-tier journal.

This initial assessment is your **Anchor**: you will return to it when checking whether consensus with Gemini is actually correct.

---

## 3. Start a structured, persistent, rigorous duel with Gemini

### 3.1 Access / Human-in-the-loop

- Open Gemini. Navigate to <https://gemini.google.com/app> (or the `/u/1/app` variant if you use multiple profiles).  
- Pause at the login screen. If a login prompt or "Sign in" button appears, do **not** click it yourself. Ask me (the user) to take over to handle the authentication with my institutional account. This avoids Google’s "insecure browser" or similar security lockouts.  
- **User-authenticated login.** I (the user) will enter credentials and complete any two-factor authentication. Once I confirm that I’m signed in and the Gemini interface is visible, the Agent can continue.  
- **Upload documents.** After login, check whether the relevant documents are present in Gemini. If uploads are needed and the Agent cannot perform them due to permissions, ask me to upload the files manually and wait for my confirmation before proceeding. Keep your discussion with Gemini in the Gemini chat where the files are uploaded.  
- **Patience and responsiveness.** Gemini can be slow to respond. As ChatGPT, never simulate delays or "waiting" -- respond only when there is visible output from Gemini or a new message from the user.

### 3.2 Status Header (State Vector)

At the top of every duel reply you send (during Step 3), prepend a one-line status header in this format:

> `Round: X | Mode: probing / converging | Anchor: same / slightly revised / substantially revised`

This header is a simple convention; it does not give you new capabilities, but it helps structure your reasoning and makes changes to your view explicit.

- **Round: X** is your best approximate count of the exchange.  
- **Mode:** `probing` (questioning, exploring) vs `converging` (testing a candidate conclusion).  
- **Anchor:** how far your current view is from the Step 2 Anchor: `same` / `slightly revised` / `substantially revised`.

This header is visible and must be updated each turn. Its purpose is to keep you grounded, reduce drift, and make your evolving stance transparent.

### 3.3 Duel protocol (treating Gemini as fallible)

- Ask targeted, specific, technical questions.  
- Focus on the most important substantive issues first.  
- Challenge every claim that looks weak, underspecified, or inconsistent.  
- Request step-by-step reasoning from Gemini where useful.  
- Push for clarity on identification, assumptions, logic, and counterexamples.  
- When answers are vague, demand precision.  
- When answers are wrong or rely on incorrect assumptions (including wrong assumptions about ChatGPT/agent capabilities), point out the error and request correction.  
- When Gemini proposes elaborate structures, explicitly check whether they are actually helpful given ChatGPT's known limitations; reject them if they are overengineered.  
- Do not treat "agreement" with Gemini as evidence of truth. Treat Gemini as a strong but fallible colleague whose work must be audited.  
- **Source check.** When Gemini states a factual claim, numerical result, or formula, explicitly ask whether it is grounded in the attached materials or comes from its own prior training / extrapolation. Treat file-grounded facts differently from speculative additions.  
- **Label speculation.** Whenever Gemini proposes new methods, thresholds, or performance numbers that are not in the provided documents, explicitly label them as "proposed extension (not in files)" and do not present them later as if they were documented results.

### 3.4 Persistence

- Continue the duel as long as the system allows, using the maximum available time and context window.  
- Do not stop early or switch to summarizing.  
- Only conclude after reaching one of the stopping conditions below.

### 3.5 Watchdog Protocol (State-Based)

LLMs in this setting have no direct access to wall-clock time or background threads, so you must react only to observable states from the tool and page.

- **Normal behavior.**  
  If the tool returns a normal, coherent Gemini reply, proceed with the duel. Do not describe imaginary time delays.

- **Tool error / broken output.**  
  If you see an explicit error (network error, timeout, 4xx/5xx) or output that is clearly truncated or empty when a substantive reply is expected:
  - First: use available browser controls to refresh or retry once.  
  - Escalation: if it fails again, stop trying to fix it. Briefly describe the problem to me and explicitly ask me to check Gemini manually. Until I respond, continue if needed using only the information you already have, clearly noting that Gemini’s side of the duel is impaired.

- **No silent waiting.**  
  Do not write things like "I will now wait 60 seconds." Do not rely on imagined time passing. All your actions must be grounded in visible tool states.

### 3.6 Stopping conditions

Stop only when one of the following is satisfied:

- **Verified Consensus.**  
  You and Gemini converge on a well-supported, high-confidence conclusion (99% or higher) and you have verified independently that this conclusion still holds when you critically re-examine it without deferring to Gemini, **or**

- **Irreducible Disagreement.**  
  All remaining disagreements are fully mapped, well-justified, and logically consistent, and you can explain clearly why uncertainty remains.

---

## 4. Throughout the duel

- Adopt an adversarial, truth-seeking stance (red-team style): your sole objective is to stress-test every claim until only the strongest reasoning survives.  
- Be more assertive and adversarial than with human users.  
- Do not accept vague or unsupported statements.  
- Stress-test every argument, including your own evolving view.  
- Push Gemini on borderline cases, robustness, and consistency.  
- When Gemini appears confident, double-check that its reasoning really follows; past experience shows Gemini can sound plausible yet be wrong.  
- Keep asking until Gemini defends its position rigorously or revises it.  
- Do not attempt to save time -- use the full reasoning budget.  
- Regularly pull the discussion back to the attached materials: ask explicitly "Where in the files is this supported?" and "What in the files contradicts this?" This keeps the duel anchored in evidence rather than drifting into unconstrained theory.

---

## 5. After the duel, perform a self-audit and report back to me

### 5a. Self-audit (independence check)

- **Reproduction.** Copy and paste your original **"Step 2: Independent Anchor"** assessment into the chat (verbatim).  
- **Comparison.** Re-read that Anchor carefully. Re-evaluate the problem from scratch, using the duel only as one source of evidence.  
- Ask yourself explicitly: *"If I ignore Gemini's wording and look only at logic and evidence, would I still hold the same conclusion?"*  
- If not, adjust your conclusion and explain why.  
- In your final write-up, explicitly distinguish (with separate bullets or labels) between:
  - (a) conclusions directly supported by the attached materials, and  
  - (b) conclusions or methodological proposals that arose only from the duel with Gemini.

### 5b. Final report to me

Provide:

- **Final joint outcome:** agreements, disagreements, and your final conclusion after the self-audit.  
- **The Audit:** how Gemini changed or improved your view (or why your original view from Step 2 ultimately prevailed).  
- **Remaining uncertainties:** what evidence or analysis would be required to resolve them.

Focus on delivering the best possible answer, not the friendliest compromise with Gemini.
