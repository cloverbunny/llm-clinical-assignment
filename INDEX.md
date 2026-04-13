# Complete Index & Navigation Guide

**Quick links to everything in this repository.**

---

## 📚 Documentation by Audience

### For Candidates (Taking the Assignment)

**Start here:**
1. [QUICKSTART.md](QUICKSTART.md) – 10-minute overview
2. [SETUP.md](SETUP.md) – Get a local LLM working
3. [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md) – Understand the task
4. [assignment/CLINICAL_NOTES.md](assignment/CLINICAL_NOTES.md) – See test cases

**Reference:**
- [examples/solution_python.py](examples/solution_python.py) – Example code (Python)
- [examples/solution_javascript.js](examples/solution_javascript.js) – Example code (JavaScript)
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) – When things go wrong

**Your submission folder:**
```
candidates/<your_name>/
├── code/solution.py ............... Your code
├── code/requirements.txt .......... Dependencies
├── code/README.md ................ How to run
├── output/results.json ........... Your output
└── notes/REFLECTION.md .......... Your analysis
```

---

### For Evaluators (Grading)

**Start here:**
1. [QUICKSTART.md](QUICKSTART.md) – 10-minute overview (evaluator section)
2. [grading/RUBRIC.md](grading/RUBRIC.md) – How to grade
3. [grading/results.csv](grading/results.csv) – Record scores here
4. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) – When their code doesn't work

**Process:**
1. Get candidate code
2. Run their `code/solution.py` or `code/solution_javascript.js`
3. Check `output/results.json` for correctness
4. Score using [grading/RUBRIC.md](grading/RUBRIC.md)
5. Fill in [grading/results.csv](grading/results.csv)

---

### For Hiring Managers

**To understand the assignment:**
- [README.md](README.md) – Overview & rationale
- [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md) – Full task description
- [grading/RUBRIC.md](grading/RUBRIC.md) – What you're grading

**To assess candidates:**
- [grading/results.csv](grading/results.csv) – Scores and commentary
- `candidates/<name>/notes/REFLECTION.md` – Their analysis
- `candidates/<name>/code/solution.py` – Their code quality

**Key metrics:**
- **50-point scale** (see [grading/RUBRIC.md](grading/RUBRIC.md))
- **10 test cases** (see [assignment/CLINICAL_NOTES.md](assignment/CLINICAL_NOTES.md))
- **Factors:** Code quality, accuracy, error handling, documentation, clinical reasoning

---

## 📁 Repository Structure

```
llm-clinical-assignment/
│
├── README.md ........................ Main overview (READ FIRST)
├── QUICKSTART.md ................... 10-minute quick start
├── SETUP.md ........................ Local LLM setup guide
├── TROUBLESHOOTING.md .............. Problem & solutions
│
├── assignment/
│   ├── ASSIGNMENT.md ............... Full task description (50 points)
│   │                              ├─ Objective
│   │                              ├─ Requirements
│   │                              ├─ Grading rubric
│   │                              └─ Tips for success
│   │
│   └── CLINICAL_NOTES.md ........... 10 synthetic ICU H&Ps
│                                   ├─ Case 1: Sepsis
│                                   ├─ Case 2: MI
│                                   ├─ Case 3: Head trauma
│                                   ├─ Case 4: Pancreatitis
│                                   ├─ Case 5: Meningitis
│                                   ├─ Case 6: AKI/Hyperkalemia
│                                   ├─ Case 7: Liver failure
│                                   ├─ Case 8: Aortic dissection
│                                   ├─ Case 9: DKA/Pneumonia
│                                   └─ Case 10: GI bleed
│
├── examples/
│   ├── solution_python.py .......... Working Python solution
│   ├── solution_javascript.js ...... Working JavaScript solution
│   └── sample_output.json .......... Expected JSON format
│
├── candidates/
│   ├── example_candidate/ .......... Template for submissions
│   │   ├── code/
│   │   │   ├── solution.py ........ Candidate writes this
│   │   │   ├── requirements.txt ... Candidate lists dependencies
│   │   │   └── README.md ......... Candidate explains setup
│   │   │
│   │   ├── output/
│   │   │   └── results.json ....... Candidate's output
│   │   │
│   │   └── notes/
│   │       └── REFLECTION.md ..... Candidate's analysis
│   │
│   └── <alice_smith>/ ............. Real submissions go here
│   └── <bob_jones>/ .............. (repeat structure above)
│
├── grading/
│   ├── RUBRIC.md ................... Detailed grading guide (50 points)
│   │                              ├─ Code execution (10 pts)
│   │                              ├─ JSON structure (10 pts)
│   │                              ├─ Accuracy (15 pts)
│   │                              ├─ Error handling (5 pts)
│   │                              └─ Documentation (5 pts)
│   │
│   └── results.csv ................ Evaluation results spreadsheet
│
└── .gitignore ..................... What to ignore in git

```

---

## 🎯 Key Files at a Glance

| File | Purpose | For Whom |
|------|---------|----------|
| [README.md](README.md) | Project overview | Everyone |
| [QUICKSTART.md](QUICKSTART.md) | 10-min quick start | Candidates, Evaluators |
| [SETUP.md](SETUP.md) | LLM installation | Candidates |
| [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md) | Full task + rubric | Candidates, Evaluators |
| [assignment/CLINICAL_NOTES.md](assignment/CLINICAL_NOTES.md) | 10 test cases | Candidates, Evaluators |
| [examples/solution_python.py](examples/solution_python.py) | Working code | Candidates |
| [examples/solution_javascript.js](examples/solution_javascript.js) | Working code | Candidates |
| [grading/RUBRIC.md](grading/RUBRIC.md) | How to grade | Evaluators |
| [grading/results.csv](grading/results.csv) | Score sheet | Evaluators |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Problem solving | Candidates, Evaluators |

---

## 🔍 Finding Answers

### "How do I set up a local LLM?"
→ [SETUP.md](SETUP.md) – Full guide with 4 options (Ollama, LM Studio, LLaMA.cpp, vLLM)

### "What's the assignment?"
→ [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md) – Full task, requirements, examples

### "What are the test cases?"
→ [assignment/CLINICAL_NOTES.md](assignment/CLINICAL_NOTES.md) – 10 ICU cases

### "Can I see example code?"
→ [examples/solution_python.py](examples/solution_python.py) or [examples/solution_javascript.js](examples/solution_javascript.js)

### "How do I submit?"
→ [QUICKSTART.md](QUICKSTART.md) – "For Candidates" section

### "How do I grade?"
→ [grading/RUBRIC.md](grading/RUBRIC.md) – Full grading guide with point breakdowns

### "My code isn't working. Help!"
→ [TROUBLESHOOTING.md](TROUBLESHOOTING.md) – Common problems and solutions

### "What does the prompt look like?"
→ [examples/solution_python.py](examples/solution_python.py) – See `create_prompt()` function

### "What's expected output?"
→ [examples/sample_output.json](examples/sample_output.json) – Example JSON

### "I'm evaluating. Where do I start?"
→ [QUICKSTART.md](QUICKSTART.md) – "For Evaluators" section

### "Where do I record scores?"
→ [grading/results.csv](grading/results.csv) – CSV spreadsheet

---

## 📊 Assignment Stats

| Metric | Value |
|--------|-------|
| **Assignment Type** | LLM Integration Task |
| **Time Estimate** | 2-4 hours |
| **Difficulty** | Beginner to Intermediate |
| **Test Cases** | 10 synthetic ICU H&Ps |
| **Total Points** | 50 |
| **Languages Supported** | Python, JavaScript, Go, etc. |
| **API Keys Required** | None (local LLMs only) |
| **Example Solutions** | Python + JavaScript |

---

## 🎓 Learning Outcomes

By completing this assignment, candidates demonstrate:

✅ **LLM Integration** – Can call local LLMs from code  
✅ **Prompt Engineering** – Can write clear, effective prompts  
✅ **Data Validation** – Can parse and validate JSON output  
✅ **Error Handling** – Can handle LLM failures gracefully  
✅ **Clinical Reasoning** – Can identify medication accuracy issues  
✅ **Code Quality** – Can write readable, documented code  
✅ **Documentation** – Can explain their approach clearly  

---

## 🚀 Getting Started (TL;DR)

### For Candidates

```bash
# 1. Clone
git clone <repo-url>
cd llm-clinical-assignment

# 2. Read (10 min)
cat QUICKSTART.md  # Read the candidate section

# 3. Setup (15 min)
bash  # Read SETUP.md, install Ollama/LM Studio/etc

# 4. Code (2-3 hours)
cp -r candidates/example_candidate candidates/your_name
# Edit candidates/your_name/code/solution.py

# 5. Submit
git add candidates/your_name/
git commit -m "My LLM medication extraction solution"
git push
```

### For Evaluators

```bash
# 1. Get submission
cd candidates/<name>/code/

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run code
python solution.py < ../../assignment/CLINICAL_NOTES.md > ../output/results.json

# 4. Grade
# Open grading/RUBRIC.md
# Check accuracy, documentation, error handling
# Fill in grading/results.csv
```

---

## 📞 Support & Questions

| Question | Answer Location |
|----------|-----------------|
| "How do I set up Ollama?" | [SETUP.md](SETUP.md) – Ollama section |
| "What's the task?" | [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md) |
| "Can I see code?" | [examples/solution_python.py](examples/solution_python.py) |
| "How do I submit?" | [QUICKSTART.md](QUICKSTART.md) – Candidate section |
| "How do I grade?" | [grading/RUBRIC.md](grading/RUBRIC.md) |
| "Something's broken!" | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |

---

## 📈 Evaluation Workflow

```
1. Candidate Clones Repo
   └─ cd llm-clinical-assignment
   
2. Reads QUICKSTART.md + SETUP.md + ASSIGNMENT.md
   └─ Sets up local LLM (Ollama, etc)
   
3. Copies Template
   └─ candidates/example_candidate → candidates/<name>
   
4. Writes Code
   └─ candidates/<name>/code/solution.py (or .js)
   
5. Tests Locally
   └─ python solution.py < clinical_notes.txt > output.json
   
6. Documents Approach
   └─ README.md + REFLECTION.md
   
7. Submits
   └─ git push (or zip + email)

═══════════════════════════════════════════════════════

8. Evaluator Gets Submission
   └─ Runs candidate code

9. Tests All 10 Cases
   └─ Checks accuracy against clinical notes

10. Grades Using RUBRIC.md
    └─ Code execution (10 pts)
    └─ JSON structure (10 pts)
    └─ Accuracy (15 pts)
    └─ Error handling (5 pts)
    └─ Documentation (5 pts)
    
11. Records Results
    └─ grading/results.csv
    
12. Provides Feedback
    └─ Discusses with candidate
```

---

## ✨ Pro Tips

**For Candidates:**
- Start with [examples/solution_python.py](examples/solution_python.py) – it's a working baseline
- Spend time on prompt engineering – it's 80% of the solution
- Test iteratively against all 10 cases
- Document hallucinations and misses in REFLECTION.md

**For Evaluators:**
- Run all 10 test cases – don't just run one
- Compare extracted meds against original notes manually
- Look at REFLECTION.md to understand their thought process
- Award partial credit for good iteration, even if final result isn't perfect

**For Hiring Managers:**
- This tests real skills: LLM integration, prompt engineering, error handling
- 50-point scale is flexible (adjust weights if desired)
- REFLECTION.md is as important as the code
- Look for problem-solving ability and iteration, not just final results

---

## 🔄 Version History

- **v1.0** – Initial release with 10 test cases, Python + JavaScript examples, complete rubric

---

## 📄 License

MIT – Use freely for hiring, education, or internal training.

---

**Last Updated:** April 2026  
**Questions?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or check the relevant guide above.
