interface Props {
  kind: 'form' | 'brain' | 'chart';
  color?: string;
  size?: number;
}

export default function StepIcon({ kind, color = 'currentColor', size = 40 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 40 40',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (kind === 'form')
    return (
      <svg {...common}>
        <rect x="6" y="4" width="28" height="32" rx="4" />
        <path d="M12 12h16M12 18h16M12 24h10" />
        <circle cx="28" cy="28" r="4" />
        <path d="M25.5 28 L27 29.5 L30.5 26" />
      </svg>
    );
  if (kind === 'brain')
    return (
      <svg {...common}>
        <path d="M14 8a4 4 0 0 0-4 4v2a4 4 0 0 0-2 3.5A4 4 0 0 0 10 22a4 4 0 0 0 4 4h1v6h10v-6h1a4 4 0 0 0 4-4 4 4 0 0 0-2-3.5V12a4 4 0 0 0-4-4z" />
        <path d="M14 14v4M20 10v22M26 14v4" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M6 32h28" />
      <rect x="10" y="20" width="5" height="10" rx="1" />
      <rect x="18" y="14" width="5" height="16" rx="1" />
      <rect x="26" y="8" width="5" height="22" rx="1" />
      <path d="M8 8l6 6 6-4 8-4" />
    </svg>
  );
}
