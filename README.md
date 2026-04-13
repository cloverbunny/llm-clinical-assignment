# LLM Clinical Integration Assignment

A hands-on coding assignment designed to test candidates' ability to integrate Large Language Models (LLMs) into real clinical tasks. **No API keys required—use local LLMs only.**

## 📋 Overview

This assignment asks you to build a small Python (or JavaScript/Go/etc.) application that:

1. **Loads a local LLM** (e.g., Ollama, LM Studio, LLaMA.cpp)
2. **Reads a clinical note** (H&P—History & Physical)
3. **Prompts the LLM** with a specific clinical task
4. **Parses and validates** the structured output
5. **Handles errors gracefully**

**Estimated time:** 2–4 hours

## 🏥 The Task: Medication Extraction

Extract all medications from a clinical note and return them as **valid JSON** with this structure:

```json
{
  "medications": [
    {
      "name": "<medication_name>",
      "dose": "<dose>",
      "frequency": "<frequency>",
      "indication": "<clinical_indication>"
    }
  ]
}
```

### Rules

- Include only **explicitly named medications**—no inferences or hallucinations
- If information is missing, use `"Not specified"` instead of guessing
- Your code must produce **valid JSON** or flag errors
- Clinical accuracy matters: medications should match the note exactly

## 📁 Repository Structure

```
llm-clinical-assignment/
├── README.md                          # This file
├── SETUP.md                           # Local LLM setup guide
├── assignment/
│   ├── ASSIGNMENT.md                  # Formal assignment document
│   └── CLINICAL_NOTES.md              # 10 synthetic ICU H&P cases
├── examples/
│   ├── solution_python.py             # Example Python solution
│   ├── solution_javascript.js         # Example JavaScript solution
│   └── sample_output.json             # Expected output structure
├── candidates/
│   └── [candidate_name]/              # Each candidate forks/clones & adds their work here
│       ├── code/
│       │   ├── solution.py            # (or .js, .go, etc.)
│       │   ├── requirements.txt       # Dependencies
│       │   └── README.md              # How to run their code
│       ├── output/
│       │   └── results.json           # Output from running against test notes
│       └── notes/
│           └── REFLECTION.md          # Candidate's notes on approach & decisions
└── grading/
    ├── RUBRIC.md                      # Grading rubric (50 points)
    └── results.csv                    # Grading results (filled by evaluator)
```

## 🚀 Quick Start

### For Candidates

1. **Clone this repository:**
   ```bash
   git clone <repo-url>
   cd llm-clinical-assignment
   ```

2. **Set up a local LLM** (see [SETUP.md](SETUP.md) for detailed instructions)
   - Ollama (recommended): `ollama pull llama2`
   - LM Studio, LLaMA.cpp, or vLLM also work

3. **Read the assignment:**
   - [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md)
   - [assignment/CLINICAL_NOTES.md](assignment/CLINICAL_NOTES.md)

4. **Look at examples:**
   - [examples/solution_python.py](examples/solution_python.py)
   - [examples/solution_javascript.js](examples/solution_javascript.js)

5. **Create your solution:**
   - Copy the template directory to `candidates/<your_name>/`
   - Write your code in `candidates/<your_name>/code/`
   - Test against the clinical notes
   - Save output in `candidates/<your_name>/output/results.json`
   - Document your approach in `candidates/<your_name>/notes/REFLECTION.md`

6. **Submit:**
   - Git commit and push your candidate folder
   - Or zip and email if not using Git

### For Evaluators

1. **Clone the repository**
2. **Run candidates' solutions** (see each candidate's README)
3. **Grade using** [grading/RUBRIC.md](grading/RUBRIC.md)
4. **Log results** in [grading/results.csv](grading/results.csv)

## 📚 What We're Testing

✅ **Prompt Engineering**: Can you write clear instructions for an LLM?

✅ **LLM Understanding**: Do you understand capabilities & limitations?

✅ **Structured Data**: Can you extract and validate JSON?

✅ **Error Handling**: What happens when the LLM fails?

✅ **Clinical Knowledge**: Do medications match the note? Any hallucinations?

✅ **Code Quality**: Is the code readable, documented, and robust?

## 💻 Technologies You Can Use

**Language options:**
- Python (recommended: requests + json libraries)
- JavaScript/Node.js (fetch + JSON parsing)
- Go (net/http + encoding/json)
- Other languages welcome—just document setup

**Local LLMs:**
| Tool | OS | Speed | Setup |
|------|-----|-------|--------|
| **Ollama** | Mac/Linux/Windows | Fast | `ollama pull llama2` |
| **LM Studio** | Mac/Windows | GUI-based | Download & run |
| **LLaMA.cpp** | Any | CPU-optimized | Compile from source |
| **vLLM** | Linux | GPU-optimized | Docker or pip install |

See [SETUP.md](SETUP.md) for detailed instructions.

## 📋 Grading Rubric (50 points)

| Criterion | Points | Notes |
|-----------|--------|-------|
| Code runs without errors | 10 | Must load local LLM and produce output |
| Correct JSON structure | 10 | Output matches required format |
| Accuracy | 15 | Medications match note; no hallucinations |
| Error handling | 5 | Handles invalid JSON or timeouts gracefully |
| Documentation | 5 | README explains setup; code is readable |
| **Total** | **50** | |

See [grading/RUBRIC.md](grading/RUBRIC.md) for detailed rubric.

## 🎓 Learning Outcomes

By completing this assignment, you'll demonstrate:

- **LLM prompt engineering**: How to structure prompts for reliable output
- **Integration fundamentals**: Calling LLMs from code
- **Data validation**: Parsing and error-checking JSON
- **Clinical reasoning**: Understanding medication lists and clinical context
- **Problem-solving**: Debugging LLM outputs and improving prompts iteratively

## ❓ FAQ

### Q: Do I need an API key?
**A:** No. This assignment uses **local LLMs only**. No Anthropic, OpenAI, or other API keys required.

### Q: What if my LLM is slow?
**A:** Test with a smaller model (7B parameters) first. See [SETUP.md](SETUP.md) for recommendations.

### Q: Can I use any programming language?
**A:** Yes. Python, JavaScript, Go, Rust, etc. Just document your setup clearly.

### Q: What if the LLM returns bad JSON?
**A:** That's expected sometimes. Your code should catch this and report an error gracefully. This is part of the test.

### Q: How long should this take?
**A:** 2–4 hours for someone new to LLMs. 1 hour for experienced developers.

### Q: Can I look at example solutions?
**A:** Yes, see [examples/](examples/). This is a learning exercise; understanding the approach matters more than raw speed.

## 📞 Support

- **LLM setup help?** See [SETUP.md](SETUP.md)
- **Assignment questions?** Read [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md)
- **Code examples?** Check [examples/](examples/)
- **Grading questions?** See [grading/RUBRIC.md](grading/RUBRIC.md)

## 🤝 Contributing

If you spot errors in the clinical notes, have suggestions for improvement, or want to add new test cases, please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/improve-notes`)
3. Submit a pull request

## 📄 License

MIT License—feel free to use, modify, and distribute this assignment for hiring purposes.

## 👥 Authors

Created for hiring clinical software engineers with LLM integration skills.

---

**Good luck! Questions? Check [SETUP.md](SETUP.md) and [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md).**
