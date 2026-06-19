import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import fr from '../i18n/fr';
import en from '../i18n/en';

type Lang = 'fr' | 'en';
type Translations = typeof fr;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  ta: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const translations: Record<Lang, Translations> = { fr, en };

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string): string => {
      const val = getNestedValue(translations[lang] as unknown as Record<string, unknown>, key);
      return typeof val === 'string' ? val : key;
    },
    [lang]
  );

  const ta = useCallback(
    (key: string): string[] => {
      const val = getNestedValue(translations[lang] as unknown as Record<string, unknown>, key);
      return Array.isArray(val) ? val : [];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, ta }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
