import { useTheme } from '../hooks/useTheme';

interface Props {
  label: string;
  value: string | number;
}

export default function ReadonlyField({ label, value }: Props) {
  const { t } = useTheme();
  return (
    <div>
      <div style={{ marginBottom: 10, minHeight: 38 }}>
        <label style={{ fontSize: 13.5, fontWeight: 600, display: 'block' }}>{label}</label>
        <div style={{ fontSize: 11.5, color: 'transparent', marginTop: 2 }} aria-hidden>
          ·
        </div>
      </div>
      <div
        style={{
          padding: '13px 16px',
          borderRadius: 12,
          border: `1px solid ${t.border}`,
          background: t.chipBg,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}
