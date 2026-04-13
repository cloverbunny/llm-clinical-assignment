#!/usr/bin/env node

/**
 * Example solution: LLM medication extraction from clinical notes (JavaScript/Node.js)
 *
 * This script demonstrates how to:
 * 1. Connect to a local LLM (Ollama)
 * 2. Extract medications from a clinical note
 * 3. Parse and validate JSON output
 * 4. Handle errors gracefully
 *
 * Usage:
 *     node solution_javascript.js < clinical_note.txt > output.json
 *
 * or:
 *     node solution_javascript.js clinical_note.txt
 *
 * Requirements:
 *     npm install node-fetch
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Configuration
const LLM_URL = 'http://localhost:11434/api/generate';
const LLM_MODEL = 'llama2';
const TIMEOUT = 60000; // milliseconds


/**
 * Create a detailed prompt for medication extraction.
 */
function createPrompt(clinicalNote) {
  return `You are a medical coding assistant. Extract all medications from the clinical note below.

Return ONLY valid JSON with no preamble, explanation, or markdown code blocks. 

If a field is missing from the note, use "Not specified" instead of guessing.

Do not invent or hallucinate medications that are not explicitly mentioned in the note.

Clinical Note:
${clinicalNote}

Return JSON in this exact format (raw JSON only, no markdown):
{"medications": [{"name": "medication_name", "dose": "dose_amount", "frequency": "how_often", "indication": "why_given"}]}

Examples of correct output:
{"medications": [{"name": "Metformin", "dose": "500 mg", "frequency": "BID", "indication": "Type 2 diabetes"}, {"name": "Lisinopril", "dose": "10 mg", "frequency": "daily", "indication": "Hypertension"}, {"name": "Albuterol", "dose": "Not specified", "frequency": "PRN", "indication": "COPD"}]}

Now extract medications from the note:`;
}


/**
 * Call the local LLM and return the response.
 */
async function callLLM(prompt) {
  try {
    console.error(`[DEBUG] Calling LLM at ${LLM_URL}...`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    const response = await fetch(LLM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: LLM_MODEL,
        prompt: prompt,
        stream: false,
        temperature: 0.1  // Lower temperature for deterministic output
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`LLM request timed out after ${TIMEOUT / 1000} seconds`);
    }
    if (error.code === 'ECONNREFUSED') {
      throw new Error(
        `Cannot connect to LLM at ${LLM_URL}. Make sure Ollama is running: ollama serve`
      );
    }
    throw error;
  }
}


/**
 * Parse and validate JSON response from LLM.
 */
function parseJsonResponse(responseText) {
  let text = responseText.trim();

  // Remove markdown code blocks if present
  if (text.startsWith('```json')) {
    text = text.slice(7);
  }
  if (text.startsWith('```')) {
    text = text.slice(3);
  }
  if (text.endsWith('```')) {
    text = text.slice(0, -3);
  }
  text = text.trim();

  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(
      `LLM returned invalid JSON: ${error.message}\nRaw response: ${text.substring(0, 200)}...`
    );
  }

  // Validate structure
  if (typeof data !== 'object' || data === null) {
    throw new Error(`Expected object at root, got ${typeof data}`);
  }

  if (!('medications' in data)) {
    throw new Error("Missing 'medications' key in response");
  }

  if (!Array.isArray(data.medications)) {
    throw new Error(`Expected 'medications' to be an array, got ${typeof data.medications}`);
  }

  // Validate each medication
  for (let med of data.medications) {
    if (typeof med !== 'object' || med === null) {
      throw new Error(`Medication should be object, got ${typeof med}`);
    }
    const requiredKeys = ['name', 'dose', 'frequency', 'indication'];
    for (let key of requiredKeys) {
      if (!(key in med)) {
        throw new Error(`Medication missing key: ${key}`);
      }
    }
  }

  return data;
}


/**
 * Main function: extract medications from a clinical note.
 */
async function extractMedications(clinicalNote) {
  if (!clinicalNote.trim()) {
    throw new Error('Clinical note is empty');
  }

  // Create prompt
  const prompt = createPrompt(clinicalNote);

  // Call LLM
  console.error('[DEBUG] Getting response from LLM...');
  const responseText = await callLLM(prompt);

  // Parse response
  console.error('[DEBUG] Parsing JSON response...');
  const result = parseJsonResponse(responseText);

  return result;
}


/**
 * Read input from file or stdin, extract medications, output JSON.
 */
async function main() {
  try {
    let clinicalNote;

    if (process.argv.length > 2) {
      // Read from file
      const filePath = process.argv[2];
      try {
        clinicalNote = fs.readFileSync(filePath, 'utf-8');
      } catch (error) {
        console.error(`Error: File not found: ${filePath}`);
        process.exit(1);
      }
    } else {
      // Read from stdin
      clinicalNote = await readStdin();
    }

    // Extract medications
    const result = await extractMedications(clinicalNote);

    // Output JSON
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    // Error handling
    const errorOutput = {
      error: error.message,
      medications: []
    };
    console.log(JSON.stringify(errorOutput, null, 2));
    console.error(`\n[ERROR] ${error.message}`);
    process.exit(1);
  }
}


/**
 * Helper: read from stdin (Node.js)
 */
function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf-8');

    process.stdin.on('readable', () => {
      let chunk;
      while ((chunk = process.stdin.read()) !== null) {
        data += chunk;
      }
    });

    process.stdin.on('end', () => {
      resolve(data);
    });

    process.stdin.on('error', reject);
  });
}


// Run main
main().catch(error => {
  console.error('[FATAL]', error);
  process.exit(1);
});
