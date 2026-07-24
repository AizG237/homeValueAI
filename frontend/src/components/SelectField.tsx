import { useTheme } from '../hooks/useTheme';

export interface Option {
  value: string | number;
  label: string;
}

interface Props {
  label: string;
  hint?: string;
  value: string | number;
  options: Option[];
  onChange: (v: string) => void;
}

export default function SelectField({ label, hint, value, options, onChange }: Props) {
  const { t } = useTheme();
  return (
    <div>
      <div style={{ marginBottom: 12, minHeight: 38 }}>
        <label style={{ fontSize: 13.5, fontWeight: 600, display: 'block' }}>{label}</label>
        {hint && <div style={{ fontSize: 11.5, color: t.muted, marginTop: 2 }}>{hint}</div>}
      </div>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '13px 40px 13px 16px',
            borderRadius: 12,
            border: `1px solid ${t.border}`,
            background: t.surface,
            color: t.text,
            fontSize: 15,
            fontWeight: 500,
            appearance: 'none',
            WebkitAppearance: 'none',
            cursor: 'pointer',
          }}
        >
          {options.map((o) => (
            <option key={String(o.value)} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: t.muted,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
