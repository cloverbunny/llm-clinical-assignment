# Troubleshooting Guide

Common problems and solutions.

## LLM Connection Issues

### "Connection refused" / "Cannot connect to localhost:11434"

**Cause:** The LLM server isn't running.

**Solution:**
```bash
# Terminal 1: Start the LLM server
ollama serve
# or
lm-studio --port 8000
# or
python -m vllm.entrypoints.openai.api_server ...

# Terminal 2: Run your code
python solution.py < clinical_note.txt
```

**Verify it's working:**
```bash
# Test with curl
curl http://localhost:11434/api/generate -X POST \
  -H "Content-Type: application/json" \
  -d '{"model":"llama2","prompt":"Hello","stream":false}'
```

---

### "ConnectionError: HTTPConnectionPool(host='localhost', port=11434) is full"

**Cause:** Too many connections or connection pool exhausted.

**Solution:**
- Add timeout and retry logic:
  ```python
  response = requests.post(url, json=data, timeout=60)
  ```
- Reuse session:
  ```python
  session = requests.Session()
  response = session.post(url, json=data, timeout=60)
  ```

---

### Timeout: "requests.exceptions.Timeout: HTTPConnectionPool read timed out"

**Cause:** LLM is too slow (model too large, hardware too slow).

**Solution:**
```bash
# Use a faster model
ollama pull mistral        # 7B, faster
ollama pull neural-chat    # Optimized for speed

# Or increase timeout
response = requests.post(url, json=data, timeout=120)  # 2 minutes
```

---

## JSON Parsing Issues

### "json.JSONDecodeError: Expecting value"

**Cause:** LLM returned invalid JSON (common!).

**Solution 1:** Strip markdown code blocks
```python
response_text = response_text.strip()
if response_text.startswith('```json'):
    response_text = response_text[7:]
if response_text.startswith('```'):
    response_text = response_text[3:]
if response_text.endswith('```'):
    response_text = response_text[:-3]
response_text = response_text.strip()

data = json.loads(response_text)
```

**Solution 2:** Improve your prompt
```
Return ONLY valid JSON. Do not include markdown code blocks, 
explanations, or any text outside the JSON.
```

**Solution 3:** Add retry logic
```python
import time
max_retries = 3
for attempt in range(max_retries):
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        if attempt < max_retries - 1:
            time.sleep(2)
            response_text = call_llm(prompt)  # Retry
        else:
            raise
```

---

### "KeyError: 'medications'"

**Cause:** Response JSON is missing the 'medications' key.

**Solution:**
```python
if 'medications' not in data:
    raise ValueError("Response missing 'medications' key")

# Or validate structure:
required_keys = {'medications'}
if not required_keys.issubset(data.keys()):
    raise ValueError(f"Missing keys: {required_keys - data.keys()}")
```

---

## LLM Output Quality Issues

### Hallucinated Medications (Medications NOT in the original note)

**Problem:** LLM invents medications.

**Examples:**
- Note says "no medications" but LLM extracts Tylenol, Advil, etc.
- Note has "Metformin" but LLM adds "Insulin", "Glucagon", "Metformin XL", etc.

**Root Cause:** LLM is predicting based on diagnosis, not reading carefully.

**Solutions:**

1. **Improve prompt specificity:**
   ```
   Extract ONLY medications explicitly mentioned by name in the clinical note.
   Do NOT infer, assume, or add medications based on the diagnosis.
   Do NOT hallucinate medications.
   If a medication is not mentioned in the note, do NOT include it.
   ```

2. **Use few-shot examples:**
   ```
   Example 1:
   Note: "Patient on metformin for diabetes"
   Output: [{"name": "Metformin", ...}]
   
   Example 2:
   Note: "Patient has diabetes, no medications"
   Output: []
   
   Example 3:
   Note: "Patient with COPD, on albuterol"
   Output: [{"name": "Albuterol", ...}]
   ```

3. **Ask for confidence:**
   ```
   For each medication, rate your confidence (high/medium/low)
   that it was explicitly mentioned in the note.
   ```

4. **Use a smaller/more precise model:**
   ```bash
   # Instead of llama2:13b, try:
   ollama pull mistral  # More precise
   ```

---

### Missed Medications (Medications in the note but NOT extracted)

**Problem:** LLM misses some medications.

**Examples:**
- Note lists 5 meds, LLM extracts only 3
- Note mentions "aspirin 81 mg daily" but LLM skips it

**Root Cause:** LLM attention issues, especially with long lists.

**Solutions:**

1. **Break up the prompt:**
   ```
   First, list all medications explicitly mentioned:
   [LLM lists them]
   
   Then, format as JSON:
   [LLM formats]
   ```

2. **Highlight the medication section:**
   ```
   Extract medications ONLY from this section:
   === MEDICATIONS ===
   [medication list]
   === END MEDICATIONS ===
   ```

3. **Ask for count first:**
   ```
   How many medications are mentioned? ___
   List them:
   1. ...
   2. ...
   ```

4. **Use structured output:**
   ```
   For each medication, extract:
   - Name:
   - Dose:
   - Frequency:
   - Indication:
   ```

---

## Code Issues

### "ModuleNotFoundError: No module named 'requests'"

**Cause:** Missing dependency.

**Solution:**
```bash
pip install requests
# or
pip install -r requirements.txt
```

---

### "NameError: name 'LLM_URL' is not defined"

**Cause:** Variable not defined or wrong scope.

**Solution:**
```python
# Define at top of file
LLM_URL = "http://localhost:11434/api/generate"
LLM_MODEL = "llama2"

# Or pass as parameter
def call_llm(prompt, url=LLM_URL, model=LLM_MODEL):
    ...
```

---

### Script doesn't read from stdin

**Problem:** Can't pipe input: `python solution.py < note.txt`

**Python solution:**
```python
import sys

# Read from stdin if no file argument
if len(sys.argv) > 1:
    with open(sys.argv[1]) as f:
        text = f.read()
else:
    text = sys.stdin.read()
```

**JavaScript solution:**
```javascript
// Use stdin
const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8');  // 0 = stdin
```

---

### Output doesn't go to file

**Problem:** `python solution.py > output.json` doesn't work

**Solution:**
```python
# Make sure you're using print() or sys.stdout
print(json.dumps(result, indent=2))  # Goes to stdout

# Not:
result  # This doesn't print anything
```

---

## Performance Issues

### "LLM is very slow" (30+ seconds per note)

**Solutions:**
1. **Use a smaller model:**
   ```bash
   ollama pull mistral  # 7B, faster than llama2:13b
   ```

2. **Reduce context/prompt size:**
   - Only include relevant parts of the note
   - Remove assessment/plan if not needed
   - Shorten the clinical note

3. **Reduce max tokens:**
   ```python
   requests.post(url, json={
       ...
       'max_tokens': 512,  # Limit output length
   })
   ```

4. **Use GPU acceleration:**
   ```bash
   # LLaMA.cpp with GPU
   ./server -m model.gguf -ngl 32
   
   # vLLM with GPU
   python -m vllm.entrypoints.openai.api_server --gpu-memory-utilization 0.9
   ```

---

### "Out of memory" error

**Cause:** Model too large for available RAM.

**Solutions:**
1. **Use quantized model:**
   ```bash
   ollama pull mistral  # Smaller
   ```

2. **Reduce batch size** (if processing multiple notes)

3. **Use CPU-optimized version:**
   ```bash
   ollama pull neural-chat  # Optimized
   ```

---

## Debugging Tips

### Print debug info

```python
import sys

def debug(msg):
    print(f"[DEBUG] {msg}", file=sys.stderr)

debug("Starting extraction...")
debug(f"Prompt length: {len(prompt)}")
debug(f"LLM response: {response_text[:100]}...")
```

### Test step by step

```bash
# Test 1: Can you connect?
python -c "import requests; print(requests.get('http://localhost:11434'))"

# Test 2: Can you call the LLM?
python -c "
import requests
r = requests.post('http://localhost:11434/api/generate', 
  json={'model':'llama2', 'prompt':'hello', 'stream':False})
print(r.json()['response'])
"

# Test 3: Can you parse the response?
python -c "
import json
text = '{\"medications\": []}'
print(json.loads(text))
"

# Test 4: Can you read the clinical note?
python -c "
with open('clinical_note.txt') as f:
    print(f.read()[:100])
"
```

### Validate JSON separately

```bash
# Use jq
jq . output/results.json

# Or Python
python -m json.tool output/results.json
```

---

## When All Else Fails

1. **Check the LLM model works:**
   ```bash
   ollama list
   ollama pull llama2  # Reinstall
   ```

2. **Restart everything:**
   ```bash
   # Kill any running processes
   pkill ollama
   pkill python
   
   # Start fresh
   ollama serve
   # In another terminal:
   python solution.py < note.txt
   ```

3. **Try a different LLM:**
   ```bash
   ollama pull mistral
   # Modify your code to use 'mistral' model
   ```

4. **Check logs:**
   ```bash
   # Ollama logs
   ollama logs
   
   # Python errors
   python solution.py 2>&1 | tee error.log
   ```

5. **Ask for help:**
   - Check error message carefully
   - Google the error message
   - Ask in the assignment repository (GitHub Issues, etc.)

---

## Evaluator Troubleshooting

### Can't run candidate's code

**Check:**
1. Does `requirements.txt` exist?
   ```bash
   pip install -r requirements.txt
   ```

2. Is it the right Python version?
   ```bash
   python --version  # Should be 3.8+
   python3 solution.py < note.txt
   ```

3. Is the LLM running?
   ```bash
   ollama serve  # In another terminal
   ```

4. Are file paths correct?
   ```bash
   # They might have hardcoded paths like /Users/alice/...
   # Ask them to fix it or make it relative
   ```

### Candidate's output doesn't match format

**Check:**
1. Is it valid JSON?
   ```bash
   jq . output/results.json
   ```

2. Does it have `medications` key?
3. Are all fields present for each medication?

If it's close, give partial credit and note the issue.

### Can't compare to expected output

**Method:**
1. Extract medications manually from the clinical note
2. Compare to their output
3. Count hallucinations and misses

**Example:**
- Note says: Metformin, Lisinopril, Albuterol (3 meds)
- Their output: Metformin, Lisinopril, Albuterol, Insulin (4 meds)
  - Insulin is hallucinated (not in note)
  - But they got the 3 correct ones

---

**Still stuck? Check the RUBRIC.md for examples or reach out.**
