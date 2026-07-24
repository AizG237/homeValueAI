import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { makeTokens } from '../theme';
import type { Tokens } from '../theme';

interface ThemeCtx {
  isDark: boolean;
  toggle: () => void;
  t: Tokens;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('hv-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  // Reflète le thème sur <html data-theme> (piloté par index.css : track du slider…).
  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('hv-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const value = useMemo<ThemeCtx>(
    () => ({ isDark, toggle: () => setIsDark((v) => !v), t: makeTokens(isDark) }),
    [isDark],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
