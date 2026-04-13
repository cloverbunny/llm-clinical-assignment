# LLM Clinical Integration Assignment

A hands-on coding assignment designed to test candidates' ability to integrate Large Language Models (LLMs) into real clinical tasks. **No API keys required—use local LLMs only.**

## 📋 Overview

This assignment asks you to build a small Python (or JavaScript/Go/etc.) application that:

1. **Loads a local LLM** (e.g., Ollama, LM Studio, LLaMA.cpp)
2. **Reads a clinical note** (H&P—History & Physical)
3. **Prompts the LLM** with a specific clinical task
4. **Parses and validates** the structured output
5. **Handles errors gracefully**

## 📁 Repository Structure


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

4. **Create your solution:**

6. **Submit:**
   - A github repo with your results

## 📚 What We're Interested in Learning

✅ **Prompt Engineering**: Can you write clear instructions for an LLM?

✅ **LLM Understanding**: Do you understand capabilities & limitations?

✅ **Structured Data**: Can you extract and validate JSON?

✅ **Error Handling**: What happens when the LLM fails?

✅ **Clinical Knowledge**: Do medications match the note? Any hallucinations?

✅ **Code Quality**: Is the code readable, documented, and robust?


## 📄 License

MIT License—feel free to use, modify, and distribute this assignment for teaching purposes.

---
