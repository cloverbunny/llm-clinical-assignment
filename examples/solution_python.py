#!/usr/bin/env python3
"""
Example solution: LLM medication extraction from clinical notes.

This script demonstrates how to:
1. Connect to a local LLM (Ollama)
2. Extract medications from a clinical note
3. Parse and validate JSON output
4. Handle errors gracefully

Usage:
    python solution_python.py < clinical_note.txt > output.json
    
or:
    python solution_python.py clinical_note.txt
"""

import json
import sys
import requests
from typing import Dict, List, Any
import time

# Configuration
LLM_URL = "http://localhost:11434/api/generate"
LLM_MODEL = "llama2"
TIMEOUT = 60  # seconds


def create_prompt(clinical_note: str) -> str:
    """Create a detailed prompt for medication extraction."""
    return f"""You are a medical coding assistant. Extract all medications from the clinical note below.

Return ONLY valid JSON with no preamble, explanation, or markdown code blocks. 

If a field is missing from the note, use "Not specified" instead of guessing.

Do not invent or hallucinate medications that are not explicitly mentioned in the note.

Clinical Note:
{clinical_note}

Return JSON in this exact format (raw JSON only, no markdown):
{{"medications": [{{"name": "medication_name", "dose": "dose_amount", "frequency": "how_often", "indication": "why_given"}}]}}

Examples of correct output:
{{"medications": [{{"name": "Metformin", "dose": "500 mg", "frequency": "BID", "indication": "Type 2 diabetes"}}, {{"name": "Lisinopril", "dose": "10 mg", "frequency": "daily", "indication": "Hypertension"}}, {{"name": "Albuterol", "dose": "Not specified", "frequency": "PRN", "indication": "COPD"}}]}}

Now extract medications from the note:"""


def call_llm(prompt: str) -> str:
    """Call the local LLM and return the response."""
    try:
        print(f"[DEBUG] Calling LLM at {LLM_URL}...", file=sys.stderr)
        response = requests.post(
            LLM_URL,
            json={
                "model": LLM_MODEL,
                "prompt": prompt,
                "stream": False,
                "temperature": 0.1,  # Lower temperature for more deterministic output
            },
            timeout=TIMEOUT
        )
        response.raise_for_status()
        return response.json()["response"]
    except requests.exceptions.ConnectionError:
        raise RuntimeError(
            f"Cannot connect to LLM at {LLM_URL}. "
            f"Make sure Ollama is running: `ollama serve`"
        )
    except requests.exceptions.Timeout:
        raise RuntimeError(f"LLM request timed out after {TIMEOUT} seconds")
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"LLM request failed: {e}")


def parse_json_response(response_text: str) -> Dict[str, List[Dict[str, str]]]:
    """Parse and validate JSON response from LLM."""
    # Sometimes LLM wraps JSON in markdown code blocks
    response_text = response_text.strip()
    if response_text.startswith("```json"):
        response_text = response_text[7:]  # Remove ```json
    if response_text.startswith("```"):
        response_text = response_text[3:]  # Remove ```
    if response_text.endswith("```"):
        response_text = response_text[:-3]  # Remove trailing ```
    response_text = response_text.strip()

    try:
        data = json.loads(response_text)
    except json.JSONDecodeError as e:
        raise RuntimeError(
            f"LLM returned invalid JSON: {e}\n"
            f"Raw response: {response_text[:200]}..."
        )

    # Validate structure
    if not isinstance(data, dict):
        raise RuntimeError(f"Expected dict at root, got {type(data)}")
    if "medications" not in data:
        raise RuntimeError("Missing 'medications' key in response")
    if not isinstance(data["medications"], list):
        raise RuntimeError(f"Expected 'medications' to be a list, got {type(data['medications'])}")

    # Validate each medication
    for med in data["medications"]:
        if not isinstance(med, dict):
            raise RuntimeError(f"Medication should be dict, got {type(med)}")
        required_keys = {"name", "dose", "frequency", "indication"}
        if not required_keys.issubset(med.keys()):
            missing = required_keys - med.keys()
            raise RuntimeError(f"Medication missing keys: {missing}")

    return data


def extract_medications(clinical_note: str) -> Dict[str, Any]:
    """Main function: extract medications from a clinical note."""
    if not clinical_note.strip():
        raise ValueError("Clinical note is empty")

    # Create prompt
    prompt = create_prompt(clinical_note)

    # Call LLM
    print("[DEBUG] Getting response from LLM...", file=sys.stderr)
    response_text = call_llm(prompt)

    # Parse response
    print("[DEBUG] Parsing JSON response...", file=sys.stderr)
    result = parse_json_response(response_text)

    return result


def main():
    """Read clinical note from file or stdin, extract medications, output JSON."""
    # Read input
    if len(sys.argv) > 1:
        # Read from file
        try:
            with open(sys.argv[1], 'r') as f:
                clinical_note = f.read()
        except FileNotFoundError:
            print(f"Error: File not found: {sys.argv[1]}", file=sys.stderr)
            sys.exit(1)
    else:
        # Read from stdin
        clinical_note = sys.stdin.read()

    try:
        # Extract medications
        result = extract_medications(clinical_note)

        # Output JSON
        json.dump(result, sys.stdout, indent=2)
        print()  # Newline at end

    except Exception as e:
        # Error handling
        error_output = {
            "error": str(e),
            "medications": []
        }
        json.dump(error_output, sys.stdout, indent=2)
        print(file=sys.stderr)
        print(f"[ERROR] {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
