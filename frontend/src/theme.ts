// Jetons de design (design tokens) — dérivés du design HomeValue.AI.
export interface Tokens {
  isDark: boolean;
  primary: string;
  primaryLight: string;
  accent: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  border: string;
  chipBg: string;
}

export function makeTokens(isDark: boolean): Tokens {
  return {
    isDark,
    primary: '#047857',
    primaryLight: '#10b981',
    accent: '#f59e0b',
    bg: isDark ? '#0a1015' : '#f6f8f7',
    surface: isDark ? '#111a20' : '#ffffff',
    surfaceAlt: isDark ? '#0f171d' : '#fbfcfc',
    text: isDark ? '#e8edf0' : '#0a0f14',
    muted: isDark ? '#7d8b95' : '#5a6b76',
    border: isDark ? 'rgba(255,255,255,.08)' : 'rgba(10,15,20,.08)',
    chipBg: isDark ? 'rgba(255,255,255,.05)' : 'rgba(10,15,20,.04)',
  };
}

// Palette des classes d'état 1..5 (rouge → vert) partagée par plusieurs composants.
export const CLASS_PALETTE = ['#dc2626', '#ea580c', '#f59e0b', '#65a30d', '#059669'];
export const CLASS_LABELS = ['Mauvais', 'Médiocre', 'Correct', 'Bon', 'Excellent'];
export const CLASS_DESCS = [
  'Rénovation lourde probablement nécessaire.',
  'Travaux importants à prévoir.',
  'État moyen, entretien standard.',
  'Bon état général, peu de travaux.',
  'État exceptionnel, aucun travaux notables.',
];
