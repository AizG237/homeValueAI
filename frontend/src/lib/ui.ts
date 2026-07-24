// Constructeurs de styles partagés, dérivés du design HomeValue.AI.
import type { CSSProperties } from 'react';
import type { Tokens } from '../theme';

export const ctaPrimary = (t: Tokens): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '15px 26px',
  borderRadius: 99,
  background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
  color: '#fff',
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: '-.005em',
  boxShadow: `0 14px 32px -10px ${t.primary}80, inset 0 1px 0 rgba(255,255,255,.15)`,
  transition: 'transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s',
});

export const ctaGhost = (t: Tokens): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '14px 22px',
  borderRadius: 99,
  border: `1px solid ${t.border}`,
  background: t.surface,
  color: t.text,
  fontSize: 14.5,
  fontWeight: 500,
});

export const ctaSmall = (t: Tokens): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '10px 18px',
  borderRadius: 99,
  background: t.text,
  color: t.bg,
  fontSize: 13.5,
  fontWeight: 600,
  transition: 'transform .15s',
});

export const navLink = (t: Tokens): CSSProperties => ({
  padding: '9px 14px',
  borderRadius: 99,
  fontSize: 13.5,
  fontWeight: 500,
  color: t.muted,
  transition: 'color .2s',
});

export const iconBtn = (t: Tokens): CSSProperties => ({
  width: 40,
  height: 40,
  borderRadius: 12,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${t.border}`,
  background: t.surface,
  transition: 'transform .15s, background .2s',
});

export const pill = (t: Tokens): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '8px 14px',
  borderRadius: 99,
  border: `1px solid ${t.border}`,
  background: t.chipBg,
  fontSize: 12.5,
  fontWeight: 500,
  color: t.muted,
  backdropFilter: 'blur(8px)',
});

export const eyebrow = (t: Tokens): CSSProperties => ({
  display: 'inline-block',
  padding: '5px 10px',
  borderRadius: 99,
  background: t.chipBg,
  fontSize: 11.5,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.12em',
  color: t.primary,
});

export const h2 = (): CSSProperties => ({
  fontFamily: 'Sora',
  fontWeight: 800,
  fontSize: 'clamp(28px,4vw,42px)',
  lineHeight: 1.05,
  letterSpacing: '-.03em',
  margin: '12px 0 0',
});

export const panel = (t: Tokens): CSSProperties => ({
  padding: 'clamp(20px,3vw,28px)',
  borderRadius: 24,
  background: t.surface,
  border: `1px solid ${t.border}`,
  boxShadow: t.isDark
    ? '0 24px 48px -24px rgba(0,0,0,.6)'
    : '0 24px 48px -24px rgba(10,15,20,.12)',
});

export const logoMark = (t: Tokens, small = false): CSSProperties => ({
  width: small ? 26 : 38,
  height: small ? 26 : 38,
  borderRadius: small ? 8 : 12,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
  color: '#fff',
  boxShadow: `0 8px 24px -8px ${t.primary}80`,
});
