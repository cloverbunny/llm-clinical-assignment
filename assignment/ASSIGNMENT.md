# LLM Clinical Integration Assignment


---

## Overview

Your task is to build a tool that:

1. Reads a clinical note 
2. Sends it to a local LLM with a specific prompt
3. Answers a clinical question

**No API keys, no cloud services, no special permissions needed.** Everything runs locally on your machine.

---

## Example Task: Medication Extraction

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

**Good luck!**
