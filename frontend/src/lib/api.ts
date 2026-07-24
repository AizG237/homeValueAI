import type { HouseForm, PredictResponse } from '../types';

const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

/** Appelle le backend FastAPI (POST /api/predict) - ou le mock local si activé. */
export async function predictCondition(form: HouseForm): Promise<PredictResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1200));
    return mockPredict(form);
  }

  const res = await fetch(`${API_BASE}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    let detail = `Erreur ${res.status}`;
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      /* réponse non-JSON */
    }
    throw new Error(detail);
  }
  return res.json();
}

/**
 * Mock local (démo hors-ligne) - reproduit la logique de scoring du design :
 * softmax sur 5 classes centrée sur 3 + un score plausible.
 */
export function mockPredict(f: HouseForm): PredictResponse {
  let score = 0;
  score += (f.grade - 7) * 0.35;
  score += f.was_renovated ? 0.9 : 0;
  score += Math.max(0, 30 - f.house_age) * 0.03;
  score -= Math.max(0, f.house_age - 60) * 0.02;
  score += f.view * 0.15;
  score += f.waterfront ? 0.4 : 0;
  const ppsf = f.price / Math.max(300, f.sqft_living);
  score += (ppsf - 250) * 0.004;
  score += ((f.sqft_living15 - 2000) / 2000) * 0.4;

  const center = 3 + Math.max(-2.5, Math.min(2.5, score));
  const temp = 0.9;
  const logits = [1, 2, 3, 4, 5].map((k) => -Math.pow(k - center, 2) / (2 * temp * temp));
  const maxL = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - maxL));
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map((e) => e / sum);

  const predicted = probs.indexOf(Math.max(...probs)) + 1;
  const labels = ['Mauvais', 'Médiocre', 'Correct', 'Bon', 'Excellent'];
  return {
    predicted_condition: predicted,
    label: labels[predicted - 1],
    confidence: probs[predicted - 1],
    probabilities: { '1': probs[0], '2': probs[1], '3': probs[2], '4': probs[3], '5': probs[4] },
  };
}
