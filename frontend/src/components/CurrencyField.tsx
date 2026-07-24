import { useTheme } from '../hooks/useTheme';

interface Props {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
}

export default function CurrencyField({ label, hint, value, onChange }: Props) {
  const { t } = useTheme();
  const display = (Number(value) || 0).toLocaleString('en-US');
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
        <span style={{ fontSize: 15, fontWeight: 600, color: t.muted }}>$</span>
        <input
          type="text"
          inputMode="numeric"
          value={display}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '');
            onChange(raw ? Number(raw) : 0);
          }}
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
        <span style={{ fontSize: 12.5, color: t.muted, fontWeight: 500 }}>USD</span>
      </div>
    </div>
  );
}
