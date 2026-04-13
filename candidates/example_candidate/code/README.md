# [Your Name] - LLM Medication Extraction Solution

## Overview

Brief description of your approach and solution.

## Setup

### Prerequisites

- Python 3.8+ (or Node.js 16+ if using JavaScript)
- Local LLM running (Ollama, LM Studio, etc.)

### Installation

1. Set up local LLM:
   ```bash
   # If using Ollama:
   ollama pull llama2
   ollama serve
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

   Or for JavaScript:
   ```bash
   npm install
   ```

## Usage

### Basic Usage

Run against a single clinical note:
```bash
python solution.py < clinical_note.txt > output.json
```

Or:
```bash
python solution.py clinical_note.txt
```

### Running Against All Test Cases

```bash
for i in 1 2 3 4 5 6 7 8 9 10; do
  echo "Testing Case $i..."
  python solution.py case_$i.txt >> output/results.json
done
```

## Approach

**LLM Choice:** [Which model did you use? Why?]

**Prompt Engineering:** [How did you structure the prompt? What instructions were critical?]

**Iteration:** [What changed from your first attempt to final version?]

**Key Implementation Details:**
- How you handle JSON parsing errors
- How you validate output structure
- Any special handling for edge cases

## Challenges & Solutions

### Challenge 1: [Describe problem]
**Solution:** [How you solved it]

### Challenge 2: [Describe problem]
**Solution:** [How you solved it]

## Results

- **Test Cases Passed:** X/10
- **Hallucinations Detected:** [List any medications the LLM invented]
- **Missed Medications:** [Any medications the LLM failed to extract?]

## Future Improvements

If you had more time, what would you do differently?

- [ ] Better prompt engineering
- [ ] Retry logic for failed cases
- [ ] Confidence scoring for each medication
- [ ] Fine-tuning on medical data
- [ ] Integration with other NLP tools

## Notes for Reviewers

Any additional context or caveats?

---

**Submission Date:** [Date]  
**Time Spent:** [Estimate: 2-4 hours typical]
