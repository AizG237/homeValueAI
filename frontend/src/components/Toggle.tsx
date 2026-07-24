import { useTheme } from '../hooks/useTheme';

interface Props {
  label: string;
  hint?: string;
  value: number; // 0 | 1
  onChange: (v: number) => void;
}

export default function Toggle({ label, hint, value, onChange }: Props) {
  const { t } = useTheme();
  const on = !!value;
  return (
    <button
      onClick={() => onChange(on ? 0 : 1)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        width: '100%',
        padding: '16px 20px',
        borderRadius: 16,
        border: `1px solid ${on ? t.primary : t.border}`,
        background: on ? 'rgba(4,120,87,.06)' : 'transparent',
        transition: 'all .2s',
        cursor: 'pointer',
      }}
    >
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
        {hint && <div style={{ fontSize: 11.5, color: t.muted, marginTop: 2 }}>{hint}</div>}
      </div>
      <div
        style={{
          width: 48,
          height: 28,
          borderRadius: 99,
          position: 'relative',
          flexShrink: 0,
          background: on ? t.primary : 'rgba(10,15,20,.15)',
          transition: 'background .25s',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: on ? 23 : 3,
            width: 22,
            height: 22,
            borderRadius: 99,
            background: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,.2)',
            transition: 'left .25s cubic-bezier(.4,1.4,.6,1)',
          }}
        />
      </div>
    </button>
  );
}
