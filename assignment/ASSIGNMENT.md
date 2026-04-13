# LLM Clinical Integration Assignment

**Time Estimate:** 2–4 hours  
**Difficulty:** Beginner to Intermediate  
**Skills Tested:** LLM integration, prompt engineering, JSON parsing, error handling, clinical reasoning

---

## Overview

Your task is to build a command-line tool that:

1. Reads a clinical note (History & Physical exam)
2. Sends it to a local LLM with a specific prompt
3. Extracts medications as structured JSON
4. Validates the output and handles errors

**No API keys, no cloud services, no special permissions needed.** Everything runs locally on your machine.

---

## The Task: Medication Extraction

### Input

A clinical note (see [CLINICAL_NOTES.md](CLINICAL_NOTES.md) for examples).

Example:
```
PATIENT: 64-year-old male
CC: Shortness of breath

HPI: Patient presents with 2 days of progressive dyspnea...

PMH: Hypertension (20 years), Type 2 diabetes (15 years), COPD

Medications: Metformin 500 mg BID, Lisinopril 10 mg daily, 
Albuterol inhaler PRN, Atorvastatin 40 mg daily

Allergies: NKDA
```

### Output

**Valid JSON** with this exact structure:

```json
{
  "medications": [
    {
      "name": "Metformin",
      "dose": "500 mg",
      "frequency": "BID",
      "indication": "Type 2 diabetes"
    },
    {
      "name": "Lisinopril",
      "dose": "10 mg",
      "frequency": "daily",
      "indication": "Hypertension"
    },
    {
      "name": "Albuterol",
      "dose": "Not specified",
      "frequency": "PRN",
      "indication": "COPD"
    },
    {
      "name": "Atorvastatin",
      "dose": "40 mg",
      "frequency": "daily",
      "indication": "Not specified"
    }
  ]
}
```

### Rules

1. **Only extract explicitly named medications.** Do not invent or infer medications.
2. **Use "Not specified" for missing information.** Better to be honest than hallucinate.
3. **Return valid JSON or fail gracefully.** If the LLM returns malformed JSON, your code should catch and report the error.
4. **Clinical accuracy matters.** Medications should match the note. If the LLM hallucinates a medication that's not in the note, that's a failure.
5. **Handle edge cases:** Notes may have abbreviations (BID, QID, PRN), multiple indications, or incomplete information.

---

## Your Solution Must

### ✅ Code Requirements

- [ ] Load a local LLM (Ollama, LM Studio, LLaMA.cpp, or vLLM)
- [ ] Read a clinical note from a file or stdin
- [ ] Send a well-crafted prompt to the LLM
- [ ] Parse the LLM response as JSON
- [ ] Validate the output structure
- [ ] Handle errors gracefully (invalid JSON, timeouts, LLM failure)
- [ ] Output valid JSON to stdout or a file

### ✅ Code Quality

- [ ] Code is readable with clear variable names
- [ ] Comments explain non-obvious logic
- [ ] No hardcoded paths or API keys
- [ ] Follows standard conventions for your language

### ✅ Documentation

- [ ] **README.md** in your submission folder explains:
  - How to set up your environment
  - How to run your code
  - Which local LLM you used and why
  - Any assumptions or limitations
  - Example command: `python solution.py < note.txt > output.json`

### ✅ Testing

- [ ] Test your code against all 10 clinical notes in [CLINICAL_NOTES.md](CLINICAL_NOTES.md)
- [ ] Save output to `output/results.json` (see Directory Structure below)
- [ ] Verify JSON is valid (use `jq` or Python's `json` module)

### ✅ Reflection

- [ ] Write a brief **notes/REFLECTION.md** explaining:
  - What went well
  - What was challenging
  - How you iterated on your prompt
  - Any medications the LLM hallucinated or missed
  - How you'd improve this in production

---

## Directory Structure

Create a folder with your name in `candidates/`. Example:

```
candidates/alice_smith/
├── code/
│   ├── solution.py                 # Your main solution
│   ├── requirements.txt            # pip dependencies (if Python)
│   └── README.md                   # Setup and usage instructions
├── output/
│   └── results.json                # JSON output from running your solution
│                                   # (or results_case_1.json, results_case_2.json, etc.)
└── notes/
    └── REFLECTION.md               # Your notes on approach, challenges, iterations
```

**Example README:**
```markdown
# Alice Smith's LLM Medication Extraction

## Setup

1. Install Ollama: https://ollama.ai
2. Run: `ollama pull llama2`
3. Start server: `ollama serve`
4. Install dependencies: `pip install -r requirements.txt`

## Usage

```bash
python solution.py clinical_notes.txt > output.json
```

## Approach

I used Ollama with Llama2 model. The prompt explicitly instructs the model to:
1. Extract only medications mentioned in the note
2. Return valid JSON
3. Use "Not specified" for missing info

## Challenges

The LLM sometimes added commas in JSON that broke parsing. I added error handling
to catch this and re-prompt with clearer instructions.

## Results

- 9/10 notes parsed correctly
- 1 note had a hallucinated medication (insulin not mentioned in original)
```

---

## Grading Rubric (50 Points)

| Criterion | Points | Details |
|-----------|--------|---------|
| **Code executes without errors** | 10 | Must load LLM, read notes, produce output |
| **Correct JSON structure** | 10 | Output matches required format exactly |
| **Accuracy** | 15 | Extracted medications match the note; no hallucinations |
| **Error handling** | 5 | Gracefully handles invalid JSON, timeouts, LLM failures |
| **Documentation** | 5 | Clear README; code is readable; REFLECTION addresses challenges |
| **TOTAL** | **50** | |

### Detailed Rubric

#### Code Executes (10 pts)
- ✅ 10 pts: Runs start-to-finish, produces valid JSON output
- ⚠️ 5 pts: Runs but has minor issues (warning messages, sometimes fails)
- ❌ 0 pts: Crashes or cannot run

#### JSON Structure (10 pts)
- ✅ 10 pts: Every output is valid JSON with correct keys and structure
- ⚠️ 5 pts: Mostly correct but occasional structural errors
- ❌ 0 pts: Invalid JSON or wrong structure

#### Accuracy (15 pts)
- ✅ 15 pts: All medications extracted correctly; no hallucinations (9-10/10 cases)
- ⚠️ 10 pts: Most medications correct; 1-2 hallucinations or missed (7-8/10 cases)
- ⚠️ 5 pts: Several errors; 3-4 hallucinations/missed (5-6/10 cases)
- ❌ 0 pts: Many errors; clearly guessing (< 5/10 cases)

#### Error Handling (5 pts)
- ✅ 5 pts: Catches JSON errors, timeouts, LLM failure; reports gracefully
- ⚠️ 3 pts: Handles most errors but not all edge cases
- ❌ 0 pts: No error handling; crashes on bad LLM output

#### Documentation (5 pts)
- ✅ 5 pts: Clear README; well-commented code; thoughtful REFLECTION
- ⚠️ 3 pts: Adequate README; code mostly commented; basic REFLECTION
- ❌ 0 pts: Missing README or REFLECTION; unclear code

---

## Tips for Success

### 1. Start Simple

Get the LLM working first—don't over-engineer.

```python
import requests
import json

response = requests.post(
    'http://localhost:11434/api/generate',
    json={'model': 'llama2', 'prompt': 'Say hello', 'stream': False},
    timeout=30
)
print(response.json()['response'])
```

### 2. Craft a Clear Prompt

Be explicit. The LLM is a "stochastic parrot"—it works better with detailed instructions.

❌ **Bad:**
```
Extract medications from this note:
[note text]
```

✅ **Good:**
```
You are a medical coding assistant. Extract medications from the clinical note below.

Return ONLY valid JSON with no preamble or explanation. If a field is missing from the note, use "Not specified".

Clinical Note:
[note text]

Return JSON in this format (no markdown, just raw JSON):
{"medications": [{"name": "...", "dose": "...", "frequency": "...", "indication": "..."}]}
```

### 3. Iterate on Prompts

If the LLM makes mistakes, refine your prompt:
- Add examples
- Be more explicit about edge cases
- Ask for reasoning first, then JSON
- Use phrases like "ONLY return JSON, nothing else"

### 4. Handle JSON Errors

LLMs sometimes return invalid JSON. Catch it.

```python
try:
    data = json.loads(response_text)
except json.JSONDecodeError as e:
    print(f"ERROR: Invalid JSON from LLM: {e}")
    print(f"Raw response: {response_text}")
```

### 5. Test Against All 10 Cases

Your code must work on all clinical notes in [CLINICAL_NOTES.md](CLINICAL_NOTES.md), not just one.

```bash
for i in {1..10}; do
  echo "Testing Case $i..."
  python solution.py case_$i.txt >> output/results.json
done
```

### 6. Document Edge Cases

In your REFLECTION.md, note:
- Which LLM model you chose and why
- Medications the LLM hallucinated (e.g., "Case 7 hallucinated 'insulin' which wasn't in the note")
- How you improved the prompt over iterations
- What you'd do differently in production

---

## Example Solution (Python)

See [examples/solution_python.py](../examples/solution_python.py) for a working example.

Key ideas:
- Uses `requests` library to call local Ollama
- Crafts a detailed prompt with instructions
- Wraps response parsing in try/except
- Validates JSON structure
- Provides clear error messages

---

## Submission

1. Create a folder: `candidates/<your_name>/`
2. Add:
   - `code/solution.py` (or .js, .go, etc.)
   - `code/README.md` (setup + usage)
   - `code/requirements.txt` (if Python)
   - `output/results.json` (your output)
   - `notes/REFLECTION.md` (your analysis)
3. Commit and push (or zip and email)

---

## Questions?

- **Setup issues?** See [SETUP.md](../SETUP.md)
- **Example code?** Check [examples/](../examples/)
- **Grading questions?** See rubric above
- **Clinical context?** Read the clinical notes in [CLINICAL_NOTES.md](CLINICAL_NOTES.md)

---

## Next Steps

1. ✅ Set up a local LLM ([SETUP.md](../SETUP.md))
2. ✅ Test it works (simple hello world prompt)
3. ✅ Read the first clinical note in [CLINICAL_NOTES.md](CLINICAL_NOTES.md)
4. ✅ Write a prompt to extract medications
5. ✅ Parse the JSON response
6. ✅ Add error handling
7. ✅ Test all 10 notes
8. ✅ Document your approach
9. ✅ Submit

**Good luck!**
