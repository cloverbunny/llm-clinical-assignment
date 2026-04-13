# Quick Start Guide

Get up and running in 10 minutes.

## For Candidates (Doing the Assignment)

### 1. Clone the Repository (2 min)

```bash
git clone <repo-url>
cd llm-clinical-assignment
```

### 2. Read the Assignment (5 min)

In order:
1. [SETUP.md](SETUP.md) – Pick and set up a local LLM
2. [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md) – Understand the task
3. [assignment/CLINICAL_NOTES.md](assignment/CLINICAL_NOTES.md) – See example cases
4. [examples/solution_python.py](examples/solution_python.py) – Look at working code

### 3. Set Up Your Submission (1 min)

Copy the template:
```bash
cp -r candidates/example_candidate candidates/your_name
cd candidates/your_name
```

Your folder should look like:
```
candidates/your_name/
├── code/
│   ├── solution.py (your code here)
│   ├── requirements.txt (dependencies)
│   └── README.md (how to run it)
├── output/
│   └── results.json (output from your code)
└── notes/
    └── REFLECTION.md (your analysis)
```

### 4. Start Coding (1-3 hours)

1. Set up local LLM (see [SETUP.md](SETUP.md))
2. Test it works with a simple prompt
3. Build your medication extraction solution
4. Test against all 10 clinical notes
5. Document your approach and reflections

### 5. Submit (2 min)

```bash
git add candidates/your_name/
git commit -m "Add my LLM medication extraction solution"
git push origin master
```

Or zip and email if not using Git.

---

## For Evaluators (Grading the Assignment)

### 1. Candidates Submit Code

They'll have:
- `candidates/<name>/code/solution.py` (or .js)
- `candidates/<name>/output/results.json`
- `candidates/<name>/notes/REFLECTION.md`

### 2. Run Their Code (10 min per candidate)

```bash
cd candidates/<name>/code/

# Install dependencies
pip install -r requirements.txt

# Set up local LLM (same as candidate)
# Ollama example:
ollama pull llama2
ollama serve  # In another terminal

# Run their code
python solution.py < ../../assignment/CLINICAL_NOTES.md > ../output/results.json
```

### 3. Grade Using Rubric (15-20 min per candidate)

Use [grading/RUBRIC.md](grading/RUBRIC.md):

| Criterion | Points | Check |
|-----------|--------|-------|
| Code Execution | 10 | Did it run? Any crashes? |
| JSON Structure | 10 | Valid JSON with correct keys? |
| Accuracy | 15 | Do medications match notes? Hallucinations? |
| Error Handling | 5 | Graceful error handling? |
| Documentation | 5 | Clear README and REFLECTION? |
| **TOTAL** | **50** | |

### 4. Document Results

Fill in `grading/results.csv`:
```csv
Candidate,Code Execution,JSON Structure,Accuracy,Error Handling,Documentation,Total,Comments
Alice Smith,10,9,14,5,5,43,Great prompt engineering but 1 hallucination
Bob Jones,10,10,15,5,5,45,Excellent solution
Charlie Brown,8,7,10,3,4,32,Works but needs error handling
```

---

## Common Issues & Solutions

### Candidate Can't Connect to LLM

**Problem:** "Cannot connect to localhost:11434"

**Solution:**
1. Is Ollama/LM Studio/etc. running?
   ```bash
   # Terminal 1 (leave running)
   ollama serve
   
   # Terminal 2 (run your code)
   python solution.py < note.txt
   ```
2. Is the port correct? (11434 for Ollama, 8000 for LM Studio)

### LLM Response is Invalid JSON

**Problem:** "JSONDecodeError: Expecting value"

**Solution:**
- LLM sometimes wraps JSON in markdown: ` ```json ... ``` `
- Your code should strip these:
  ```python
  if response.startswith('```json'):
      response = response[7:]  # Remove ```json
  if response.endswith('```'):
      response = response[:-3]  # Remove trailing ```
  ```

### Candidate Takes Too Long

**Problem:** LLM is slow (30+ seconds per request)

**Solution:**
- Use a smaller/faster model:
  ```bash
  ollama pull mistral  # Faster than llama2
  ```
- Or reduce context length in their prompt

### Evaluator Can't Run Candidate's Code

**Problem:** "ModuleNotFoundError: No module named 'requests'"

**Solution:**
1. Check they included `requirements.txt`
2. Install: `pip install -r requirements.txt`
3. If Python version mismatch, try: `pip install --upgrade <package>`

---

## Directory Structure Explained

```
llm-clinical-assignment/
│
├── README.md .......................... Main overview
├── SETUP.md ........................... LLM installation guide
│
├── assignment/
│   ├── ASSIGNMENT.md .................. Full task description
│   └── CLINICAL_NOTES.md .............. 10 test cases
│
├── examples/
│   ├── solution_python.py ............. Python example
│   ├── solution_javascript.js ......... JavaScript example
│   └── sample_output.json ............. Expected output
│
├── candidates/
│   └── example_candidate/ ............. Template for submissions
│       ├── code/
│       │   ├── solution.py
│       │   ├── requirements.txt
│       │   └── README.md
│       ├── output/
│       │   └── results.json
│       └── notes/
│           └── REFLECTION.md
│
├── grading/
│   ├── RUBRIC.md ...................... Detailed grading rubric
│   └── results.csv .................... Scores spreadsheet
│
└── .gitignore
```

---

## Tips for Success

### For Candidates

✅ **Start simple.** Get the LLM working with a basic "hello world" first.

✅ **Craft a clear prompt.** Spend time on the prompt; it's 80% of the work.

✅ **Test iteratively.** Run against one case, then two, then all 10.

✅ **Handle errors.** The LLM will fail sometimes; catch and report gracefully.

✅ **Document your approach.** The REFLECTION is as important as the code.

✅ **Be honest about hallucinations.** If the LLM invents medications, call it out.

### For Evaluators

✅ **Run all 10 cases.** Don't just test one; consistency matters.

✅ **Check for hallucinations.** Compare extracted meds against the original note.

✅ **Look at the reflection.** It shows how they think and iterate.

✅ **Be fair but rigorous.** This is a hiring tool; look for problem-solving ability.

✅ **Take notes.** Document which cases failed, why, and what that tells you.

✅ **Have a discussion.** Ask follow-up questions about their approach.

---

## Next Steps

### Candidate's Checklist

- [ ] Read all documentation
- [ ] Set up local LLM
- [ ] Test LLM is working
- [ ] Copy template to `candidates/<your_name>/`
- [ ] Write `code/solution.py` (or .js)
- [ ] Add dependencies to `requirements.txt`
- [ ] Write `code/README.md` with setup/usage
- [ ] Test on all 10 clinical notes
- [ ] Save output to `output/results.json`
- [ ] Write `notes/REFLECTION.md`
- [ ] Git commit and push
- [ ] Or zip and email

### Evaluator's Checklist

- [ ] Get candidate submission
- [ ] Install their dependencies
- [ ] Run their code against all 10 cases
- [ ] Verify JSON structure
- [ ] Check accuracy (compare to clinical notes)
- [ ] Review error handling
- [ ] Read REFLECTION.md
- [ ] Score using RUBRIC.md
- [ ] Fill in results.csv
- [ ] Give feedback

---

## Questions?

- **LLM setup issues?** See [SETUP.md](SETUP.md)
- **Assignment questions?** See [assignment/ASSIGNMENT.md](assignment/ASSIGNMENT.md)
- **Grading questions?** See [grading/RUBRIC.md](grading/RUBRIC.md)
- **Code examples?** Check [examples/](examples/)

**Good luck!**
