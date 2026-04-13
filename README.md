# LLM Clinical Integration Assignment

A hands-on coding assignment designed to test candidates' ability to integrate Large Language Models (LLMs) into real clinical tasks. **No API keys required—use local LLMs only.**

## 📋 Overview

Your task is to build a tool that:

1. **Loads a local LLM** (e.g., Ollama, LM Studio, LLaMA.cpp)
2. **Reads a clinical note** (H&P—History & Physical)
3. **Prompts the LLM** with a specific clinical task
4. **Parses and validates** the structured output
5. **Handles errors gracefully**

**No API keys, no cloud services, no special permissions needed.** Everything runs locally on your machine.

## 📁 Repository Structure

```
llm-clinical-assignment/
├── README.md
├── assignment/
│   └── clinical_notes/                # Test cases (10 clinical H&P notes)
│       ├── case_01_sepsis.md
│       ├── case_02_mi.md
│       ├── case_03_head_trauma.md
│       ├── case_04_pancreatitis.md
│       ├── case_05_meningitis.md
│       ├── case_06_aki.md
│       ├── case_07_liver_failure.md
│       ├── case_08_aortic_dissection.md
│       ├── case_09_dka.md
│       └── case_10_gi_bleed.md
└── examples/
    └── sample_output.json             # Expected output format
```

---

## ✅ Requirements

### Code

- [ ] Load a local LLM (Ollama, LM Studio, LLaMA.cpp, or vLLM)
- [ ] Read a clinical note from a file or stdin
- [ ] Send a well-crafted prompt to the LLM
- [ ] Parse the LLM response as JSON
- [ ] Validate the output structure
- [ ] Handle errors gracefully (invalid JSON, timeouts, LLM failure)
- [ ] Output valid JSON to stdout or a file

### Code Quality

- [ ] Code is readable with clear variable names
- [ ] Comments explain non-obvious logic
- [ ] No hardcoded paths or API keys
- [ ] Follows standard conventions for your language

### Documentation

- [ ] **README.md** in your submission folder explains:
  - How to set up your environment
  - How to run your code
  - Which local LLM you used and why
  - Any assumptions or limitations
  - Example command: `python solution.py < note.txt > output.json`

### Testing

- [ ] Test your code against all 10 clinical notes in [assignment/clinical_notes/](assignment/clinical_notes/)
- [ ] Save output to `output/results.json`
- [ ] Verify JSON is valid (use `jq` or Python's `json` module)

### Reflection

- [ ] Write a brief **notes/REFLECTION.md** explaining:
  - What went well
  - What was challenging
  - How you iterated on your prompt
  - Any medications the LLM hallucinated or missed
  - How you'd improve this in production

---

## 📤 Submission

Create a GitHub repo with this sort of structure:

```
candidate_<your_name>/
├── code/
│   ├── solution.py          # (or .js, .go, etc.)
│   ├── requirements.txt     # dependencies
│   └── README.md            # how to run
├── output/
│   └── results.json         # your output for all 10 notes
└── notes/
    └── REFLECTION.md        # your thoughts/analysis
```

---

## 🏥 Example Task: Medication Extraction

### Input

A clinical note from [assignment/clinical_notes/](assignment/clinical_notes/). Example:

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
python solution.py clinical_notes.txt > output.json

## Approach
I used Ollama with Llama2. The prompt explicitly instructs the model to:
1. Extract only medications mentioned in the note
2. Return valid JSON
3. Use "Not specified" for missing info

## Challenges
The LLM sometimes added commas in JSON that broke parsing. I added error
handling to catch this and re-prompt with clearer instructions.

## Results
- 9/10 notes parsed correctly
- 1 note had a hallucinated medication (insulin not mentioned in original)
```

---

## 📚 What We're Looking For

✅ **Prompt Engineering**: Can you write clear instructions for an LLM?

✅ **LLM Understanding**: Do you understand capabilities & limitations?

✅ **Structured Data**: Can you extract and validate JSON?

✅ **Error Handling**: What happens when the LLM fails?

✅ **Clinical Knowledge**: Do medications match the note? Any hallucinations?

✅ **Code Quality**: Is the code readable, documented, and robust?

**Good luck!**

---

## 📄 License

MIT License—feel free to use, modify, and distribute this assignment for teaching purposes.
