import { useTheme } from '../hooks/useTheme';

interface Props {
  label: string;
  hint?: string;
  unit?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  secondary?: string;
  onChange: (v: number) => void;
}

export default function SliderField({
  label,
  hint,
  unit,
  value,
  min,
  max,
  step = 1,
  secondary,
  onChange,
}: Props) {
  const { t } = useTheme();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 10,
        }}
      >
        <label style={{ fontSize: 13.5, fontWeight: 600 }}>
          {label}{' '}
          {hint && (
            <span style={{ color: t.muted, fontWeight: 400, fontSize: 12 }}>· {hint}</span>
          )}
        </label>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>
            {value.toLocaleString('en-US')}
          </span>
          {unit && <span style={{ fontSize: 12, color: t.muted }}>{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {secondary && <div style={{ fontSize: 11.5, color: t.muted, marginTop: 6 }}>{secondary}</div>}
    </div>
  );
}
