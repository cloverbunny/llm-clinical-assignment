# Local LLM Setup Guide

This assignment uses **local LLMs only**—no API keys needed. Pick one of the options below based on your OS and preferences.

## TL;DR (Quick Start)

**Mac/Linux/Windows (easiest):**
```bash
# Install Ollama
# Go to https://ollama.ai and download

# In terminal:
ollama pull llama2
ollama serve  # Runs on http://localhost:11434

# Test it works:
curl http://localhost:11434/api/generate -X POST \
  -H "Content-Type: application/json" \
  -d '{"model":"llama2","prompt":"What is the capital of France?","stream":false}'
```

Done! Your LLM is ready at `http://localhost:11434`.

---

## Option 1: Ollama (Recommended)

**Why:** Easiest to install, fast, runs on any OS, good model selection.

### Installation

1. Visit https://ollama.ai
2. Download for your OS (Mac, Windows, Linux)
3. Install and run

### Running Ollama

```bash
# Download a model (one-time, ~4-5 GB)
ollama pull llama2

# Start the server
ollama serve
```

Server runs on `http://localhost:11434`

### Model Options

- `llama2` (7B, default) – Fast, good balance
- `llama2:13b` – Better quality, slower
- `mistral` (7B, faster) – Recommended if llama2 is slow
- `neural-chat` (7B, optimized) – Good for reasoning tasks

```bash
# Try a faster model if llama2 is slow
ollama pull mistral
```

### Test It Works

```bash
# In Python:
import requests
import json

response = requests.post(
    'http://localhost:11434/api/generate',
    json={
        'model': 'llama2',
        'prompt': 'Extract medications from this: Patient on metformin and lisinopril.',
        'stream': False
    }
)
print(response.json()['response'])
```

---

## Option 2: LM Studio

**Why:** GUI-based, easiest for non-technical users.

### Installation

1. Visit https://lmstudio.ai
2. Download for Mac or Windows
3. Open the app

### Loading a Model

1. Click **Search** (magnifying glass icon)
2. Search for "llama-2-7b" or "mistral-7b"
3. Click **Download**
4. Once downloaded, click **Load into memory**
5. Click **Local Server** tab
6. Set port to `8000` (or note the port shown)

### Test It Works

The app shows the server URL (usually `http://localhost:8000`). Test:

```python
import requests

response = requests.post(
    'http://localhost:8000/v1/completions',
    json={
        'model': 'local-model',
        'prompt': 'Extract medications from: Patient on metformin.',
    }
)
print(response.json()['choices'][0]['text'])
```

---

## Option 3: LLaMA.cpp

**Why:** Lightweight, CPU-optimized, very fast on older machines.

### Installation (Mac/Linux)

```bash
# Clone repository
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

# Build
make

# Download a model (GGML format)
# Go to https://huggingface.co and search "llama-2-7b-ggml"
# Download the `.ggml` or `.gguf` file

# Run server
./server -m path/to/model.gguf -ngl 32  # GPU acceleration if available
```

Default: `http://localhost:8080`

### Installation (Windows)

1. Download pre-built binary from https://github.com/ggerganov/llama.cpp/releases
2. Extract
3. Download model from HuggingFace
4. Run: `llama-server.exe -m model.gguf`

### Test It Works

```python
import requests

response = requests.post(
    'http://localhost:8080/completion',
    json={
        'prompt': 'Extract medications: Patient on metformin.',
        'n_predict': 128
    }
)
print(response.json()['content'])
```

---

## Option 4: vLLM (For GPU Power Users)

**Why:** Fastest inference, best for development.

### Installation

```bash
pip install vllm

# Run
python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Llama-2-7b-hf \
  --port 8000
```

Requires HuggingFace account and GPU access.

---

## Comparison Table

| Tool | OS | Speed | Setup | Learning Curve | GPU Support |
|------|-----|--------|--------|------------------|-------------|
| **Ollama** | Mac/Linux/Windows | ⭐⭐⭐ Fast | ⭐ Easy | ⭐ None | ✅ |
| **LM Studio** | Mac/Windows | ⭐⭐ Medium | ⭐ Very easy | ⭐ None | ✅ |
| **LLaMA.cpp** | Any | ⭐⭐⭐⭐ Very fast | ⭐⭐ Medium | ⭐⭐ Some | ✅ |
| **vLLM** | Linux | ⭐⭐⭐⭐⭐ Fastest | ⭐⭐⭐ Complex | ⭐⭐⭐ More | ✅ Required |

**Recommendation for beginners:** Start with **Ollama**.

---

## Troubleshooting

### "Connection refused" / "Cannot connect to localhost:11434"

**Solution:** Make sure the server is running in another terminal window.

```bash
# Terminal 1 (leave running)
ollama serve

# Terminal 2 (your code)
python your_solution.py
```

### Model is very slow

**Solution:** Try a smaller model.

```bash
# Instead of llama2:13b, use:
ollama pull mistral  # Faster, still good quality
```

### Out of memory

**Solution:** Use quantized versions or smaller models.

```bash
# Instead of llama2 (7B full), try:
ollama pull neural-chat  # Optimized, smaller
```

### "Model not found"

**Solution:** Make sure you've downloaded the model.

```bash
# Check available models
ollama list

# Pull if missing
ollama pull llama2
```

---

## API Endpoints (By Tool)

### Ollama
```
POST http://localhost:11434/api/generate
{
  "model": "llama2",
  "prompt": "...",
  "stream": false
}
```

### LM Studio
```
POST http://localhost:8000/v1/completions
{
  "model": "local-model",
  "prompt": "...",
}
```

### LLaMA.cpp
```
POST http://localhost:8080/completion
{
  "prompt": "...",
  "n_predict": 128
}
```

### vLLM (OpenAI-compatible)
```
POST http://localhost:8000/v1/completions
{
  "model": "llama-2-7b",
  "prompt": "...",
}
```

---

## Tips for Success

✅ **Start simple:** Test the LLM with a basic prompt first
```python
response = requests.post(url, json={'prompt': 'Hello', ...})
```

✅ **Prompt engineering matters:** Be very explicit with your instructions
```python
prompt = """Extract medications from this clinical note. Return ONLY valid JSON.

[Clinical note text]

Return JSON in this format:
{"medications": [{"name": "...", "dose": "...", "frequency": "...", "indication": "..."}]}
"""
```

✅ **Handle errors:** LLMs sometimes fail or return invalid JSON
```python
try:
    data = json.loads(response.json()['content'])
except json.JSONDecodeError:
    print("ERROR: LLM returned invalid JSON")
```

✅ **Use timeouts:** Prevent hanging if server is slow
```python
response = requests.post(url, json=payload, timeout=30)
```

---

## Next Steps

1. ✅ Pick a tool above and install it
2. ✅ Download a model (`ollama pull llama2`, etc.)
3. ✅ Test it works (curl or Python code)
4. ✅ Read [assignment/ASSIGNMENT.md](../assignment/ASSIGNMENT.md)
5. ✅ Start writing your solution!

**Questions?** Check the tool's documentation or ask for help.
