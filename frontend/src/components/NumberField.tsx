import { useTheme } from '../hooks/useTheme';

interface Props {
  label: string;
  hint?: string;
  unit?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}

export default function NumberField({ label, hint, unit, value, min, max, onChange }: Props) {
  const { t } = useTheme();
  return (
    <div>
      <div style={{ marginBottom: 10, minHeight: 38 }}>
        <label style={{ fontSize: 13.5, fontWeight: 600, display: 'block' }}>{label}</label>
        {hint && <div style={{ fontSize: 11.5, color: t.muted, marginTop: 2 }}>{hint}</div>}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 16px',
          borderRadius: 12,
          border: `1px solid ${t.border}`,
        }}
      >
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            flex: 1,
            padding: '10px 0',
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontFamily: 'Sora',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '-.01em',
            width: '100%',
          }}
        />
        {unit && <span style={{ fontSize: 12.5, color: t.muted, fontWeight: 500 }}>{unit}</span>}
      </div>
    </div>
  );
}
