const AI_KEY_STORAGE = 'bloomday-gemini-api-key'
const MODEL = 'gemini-2.0-flash'

export function loadAiApiKey() {
  try {
    return localStorage.getItem(AI_KEY_STORAGE) || ''
  } catch {
    return ''
  }
}

export function saveAiApiKey(key) {
  const trimmed = String(key || '').trim()
  if (!trimmed) localStorage.removeItem(AI_KEY_STORAGE)
  else localStorage.setItem(AI_KEY_STORAGE, trimmed)
  return trimmed
}

export function hasAiApiKey() {
  return Boolean(loadAiApiKey() || import.meta.env.VITE_GEMINI_API_KEY)
}

function resolveApiKey() {
  return loadAiApiKey() || import.meta.env.VITE_GEMINI_API_KEY || ''
}

function buildPrompt({ subject, question, options, correctIndex, chosenIndex, shortExplain }) {
  const correct = options[correctIndex]
  const chosen = chosenIndex == null ? 'No answer' : options[chosenIndex]
  const correctLabel = String.fromCharCode(65 + correctIndex)
  const chosenLabel = chosenIndex == null ? '-' : String.fromCharCode(65 + chosenIndex)
  const isCorrect = chosenIndex === correctIndex

  return `You are a kind Class 3 ICSE tutor helping a girl named Saruchi (about 8 years old) in Bangalore.
Subject: ${subject === 'maths' ? 'Mathematics' : 'Science'}.
Explain in simple English a child can understand. Use short sentences.

Question: ${question}
Options:
${options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join('\n')}
Saruchi chose: ${chosenLabel}) ${chosen}
Correct answer: ${correctLabel}) ${correct}
Result: ${isCorrect ? 'CORRECT' : 'WRONG'}
Short note (may use): ${shortExplain || 'n/a'}

Write a step-by-step explanation with these exact headings:
1) What the question asks
2) Why Saruchi's answer is ${isCorrect ? 'right' : 'wrong'}
3) Why the correct answer is right (show the steps clearly)
4) Tiny tip to remember next time

Do not use scary words. Do not mention AI. Keep under 120 words.`
}

/** Local fallback when no API key / network fails */
export function localStepExplain({ question, options, correctIndex, chosenIndex, shortExplain }) {
  const correct = options[correctIndex]
  const chosen = chosenIndex == null ? 'No answer' : options[chosenIndex]
  const isCorrect = chosenIndex === correctIndex
  const steps = [
    `1) What the question asks: ${question}`,
    isCorrect
      ? `2) Why your answer is right: You picked “${chosen}”, and that matches the correct idea.`
      : `2) Why your answer is wrong: You picked “${chosen}”. That does not match the right idea for this question.`,
    `3) Why the correct answer is right: The right choice is “${correct}”. ${shortExplain || 'Use the lesson idea and check each option carefully.'}`,
    `4) Tiny tip: Read the question once more, then compare every option before you tap.`,
  ]
  return steps.join('\n\n')
}

/**
 * Ask Gemini for a kid-friendly step-by-step explanation.
 * Returns { text, source: 'gemini' | 'local' }
 */
export async function explainAnswer(payload) {
  const key = resolveApiKey()
  if (!key) {
    return { text: localStepExplain(payload), source: 'local' }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: buildPrompt(payload) }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 400,
        },
      }),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.warn('Gemini error', res.status, errText)
      return {
        text: `${localStepExplain(payload)}\n\n(AI helper could not reply right now — showing the simple steps above.)`,
        source: 'local',
      }
    }

    const data = await res.json()
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n').trim() || ''
    if (!text) {
      return { text: localStepExplain(payload), source: 'local' }
    }
    return { text, source: 'gemini' }
  } catch (err) {
    console.warn('Gemini fetch failed', err)
    return {
      text: `${localStepExplain(payload)}\n\n(AI helper is offline — showing the simple steps above.)`,
      source: 'local',
    }
  }
}
