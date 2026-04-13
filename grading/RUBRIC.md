# Grading Rubric

**Total: 50 points**

---

## 1. Code Execution (10 points)

**Criterion:** Does the code run without errors and produce output?

### Scoring

| Points | Criteria |
|--------|----------|
| **10** | ✅ Code runs cleanly from start to finish. Loads LLM successfully. Produces valid JSON output. No unexpected errors or crashes. |
| **7** | ⚠️ Code runs but with warnings or minor issues. May fail on 1-2 of the 10 test cases. Recovers gracefully. |
| **5** | ⚠️ Code runs but has issues. Fails on 3-4 test cases. May require manual intervention. |
| **0** | ❌ Code crashes, cannot connect to LLM, or produces no output. Does not work at all. |

### How to Grade

1. Install dependencies per their README
2. Run code on all 10 clinical notes from `assignment/CLINICAL_NOTES.md`
3. Check for crashes, timeouts, or errors
4. Note any test cases that fail

---

## 2. JSON Structure (10 points)

**Criterion:** Does the output match the required JSON format exactly?

### Required Format

```json
{
  "medications": [
    {
      "name": "<string>",
      "dose": "<string>",
      "frequency": "<string>",
      "indication": "<string>"
    }
  ]
}
```

### Scoring

| Points | Criteria |
|--------|----------|
| **10** | ✅ All 10 outputs are valid JSON with correct structure. All required keys present. Valid JSON (passes `jq` or `json.loads()`). |
| **7** | ⚠️ Most outputs (8-9/10) are valid and correct. 1-2 structural errors (wrong keys, missing fields, invalid JSON). |
| **5** | ⚠️ Some outputs (6-7/10) are valid. Multiple structural issues. |
| **0** | ❌ Most outputs invalid JSON. Incorrect structure in majority of cases. |

### How to Grade

1. Run: `jq . output/results.json` (or Python's `json.loads()`)
2. Check that every output has keys: `medications` → list of dicts → each with `name`, `dose`, `frequency`, `indication`
3. Verify JSON is valid across all 10 test cases

---

## 3. Accuracy (15 points)

**Criterion:** Do the extracted medications match the clinical note? Are there hallucinations?

### Scoring

| Points | Criteria |
|--------|----------|
| **15** | ✅ **Excellent (9-10/10 cases correct)** Medications extracted match the note exactly. No hallucinated medications. All doses, frequencies, indications accurate where provided. |
| **12** | ⚠️ **Good (7-8/10 cases correct)** Most medications correct. 1-2 hallucinated meds or slight inaccuracies in dose/frequency. Minor clinical errors. |
| **9** | ⚠️ **Fair (6-7/10 cases correct)** Several medications correct but some missed or hallucinated. Doses or indications off in 2-3 cases. |
| **6** | ⚠️ **Poor (4-5/10 cases correct)** Multiple hallucinations or missed medications. Significant clinical inaccuracies. |
| **3** | ⚠️ **Very Poor (2-3/10 cases correct)** Many errors. LLM frequently hallucinates. Candidate did not iterate on prompt. |
| **0** | ❌ **Failed (0-1/10 cases correct)** Almost all medications wrong. Heavy hallucination. No discernible accuracy. |

### How to Grade

1. For each clinical note (Cases 1-10), manually verify the extracted medications against the original
2. Check:
   - Are all medications in the note included?
   - Are there medications NOT in the note (hallucinations)?
   - Are doses accurate (or marked "Not specified" if missing)?
   - Are frequencies accurate (or marked "Not specified" if missing)?
   - Are indications reasonable (or marked "Not specified" if missing)?
3. Compare to [assignment/CLINICAL_NOTES.md](../assignment/CLINICAL_NOTES.md)

### Example

**Clinical Note says:**
```
Medications: Metformin 500 mg BID, Lisinopril 10 mg daily, Albuterol inhaler PRN
```

**Good extraction:**
```json
{
  "medications": [
    {"name": "Metformin", "dose": "500 mg", "frequency": "BID", "indication": "Not specified"},
    {"name": "Lisinopril", "dose": "10 mg", "frequency": "daily", "indication": "Hypertension"},
    {"name": "Albuterol", "dose": "Not specified", "frequency": "PRN", "indication": "Not specified"}
  ]
}
```

**Poor extraction (hallucinated "Atorvastatin", missed "Lisinopril"):**
```json
{
  "medications": [
    {"name": "Metformin", "dose": "500 mg", "frequency": "BID", "indication": "diabetes"},
    {"name": "Atorvastatin", "dose": "20 mg", "frequency": "daily", "indication": "cholesterol"},
    {"name": "Albuterol", "dose": "Not specified", "frequency": "PRN", "indication": "COPD"}
  ]
}
```

---

## 4. Error Handling (5 points)

**Criterion:** Does the code gracefully handle errors (invalid JSON, timeouts, LLM failure)?

### Scoring

| Points | Criteria |
|--------|----------|
| **5** | ✅ Excellent error handling. Catches JSON errors, timeouts, LLM failures. Provides meaningful error messages. Doesn't crash. |
| **3** | ⚠️ Handles most errors but missing some edge cases (e.g., timeout but not invalid JSON). Messages could be clearer. |
| **1** | ⚠️ Minimal error handling. May crash on malformed LLM response or timeout. |
| **0** | ❌ No error handling. Crashes on bad LLM output. No try/except or equivalent. |

### How to Grade

1. Inspect code for:
   - Try/except blocks (Python) or try/catch (JavaScript)
   - Timeout handling (requests.post with timeout parameter, fetch with AbortController, etc.)
   - JSON parsing error handling
   - Connection error handling
   - Meaningful error messages
2. Test edge cases if possible:
   - Simulate LLM timeout (kill the server, run code)
   - Intentionally malform LLM output if you have access to modify the server

---

## 5. Documentation (5 points)

**Criterion:** Is the code readable and documented? Is the README clear?

### Scoring

| Points | Criteria |
|--------|----------|
| **5** | ✅ Excellent. README clearly explains setup, usage, choice of LLM, assumptions. Code well-commented. Easy to follow logic. |
| **4** | ⚠️ Good. README explains most steps. Code mostly commented. Minor gaps. |
| **3** | ⚠️ Fair. README exists but missing details (e.g., which LLM?). Code has some comments. Readable but not polished. |
| **2** | ⚠️ Poor. README minimal. Few code comments. Somewhat unclear. |
| **0** | ❌ Missing README or REFLECTION. Code uncommented and hard to follow. No explanation. |

### How to Grade

**README.md should include:**
- [ ] How to install dependencies
- [ ] How to set up local LLM (Ollama, LM Studio, etc.)
- [ ] How to run the code (example command)
- [ ] Which LLM model was chosen and why
- [ ] Any assumptions or limitations
- [ ] Example usage and output

**Code should include:**
- [ ] Clear variable names
- [ ] Function/method docstrings
- [ ] Comments on non-obvious logic
- [ ] Error messages are helpful

**REFLECTION.md should include:**
- [ ] What went well
- [ ] What was challenging
- [ ] How you iterated on the prompt
- [ ] Medications the LLM hallucinated or missed (by case)
- [ ] How you'd improve this in production

---

## Summary Scoring

| Range | Grade | Interpretation |
|-------|-------|-----------------|
| 45-50 | A | Excellent solution. Ready for production with minor tweaks. |
| 40-44 | B+ | Good solution. Most things work. 1-2 minor issues. |
| 35-39 | B | Solid solution. Works well but some rough edges. |
| 30-34 | C+ | Functional but with issues. Clear effort but needs improvement. |
| 25-29 | C | Works but has significant problems. Needs rework. |
| <25 | F | Does not meet expectations. Major issues. |

---

## Evaluation Form Template

```
Candidate: _______________
Date: _______________
Evaluator: _______________

Test Results:
- [ ] Code runs without crashing
- [ ] Connects to LLM successfully
- [ ] Produces JSON output

Test Cases Passed: ___/10

Code Execution: ___/10
JSON Structure: ___/10
Accuracy: ___/15
Error Handling: ___/5
Documentation: ___/5

TOTAL: ___/50

Comments:
[Your feedback on strengths, weaknesses, areas for improvement]
```

---

## Special Notes

### Hallucination Check

The LLM may "hallucinate" medications not in the original note. This is a known failure mode.

**Cases prone to hallucination:**
- Case 6: ACE inhibitor + NSAID → LLM may add other meds for hyperkalemia (e.g., "insulin", "calcium gluconate")
- Case 7: Liver failure → LLM may add hepatoprotective agents like NAC
- Case 10: GI bleed → LLM may add medications for bleeding prevention

Mark these failures in accuracy scoring.

### Partial Credit for Iteration

If the candidate's REFLECTION.md shows they:
- Identified a prompt problem and fixed it
- Tested multiple LLM models
- Debugged JSON parsing errors

You can award partial credit even if the final solution has minor issues.

---

## Tips for Graders

1. **Be fair but rigorous.** This is a hiring tool. Look for:
   - Can they write clean code?
   - Do they understand LLM limitations?
   - Can they handle errors?
   - Do they iterate and improve?

2. **Document your findings.** Note which cases failed, what hallucinations occurred, any edge cases.

3. **Compare candidates.** Look for:
   - Candidate A: 9/10 cases, excellent documentation
   - Candidate B: 10/10 cases, minimal documentation
   - Candidate C: 6/10 cases, but clear effort and iteration

4. **Consider context.** Is this their first LLM project? That affects interpretation.

5. **Have a discussion.** Ideally, follow up with candidates about:
   - How would you improve this for production?
   - What was hardest about the task?
   - How would you handle 1000s of notes?

---

**Good luck grading!**
