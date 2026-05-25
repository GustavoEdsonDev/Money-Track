'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import en from '@/messages/en.json';
import ptBr from '@/messages/pt-br.json';

export type Locale = 'en' | 'pt-br';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const messages: Record<Locale, Record<string, any>> = {
  en,
  'pt-br': ptBr,
};

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, prop) => current?.[prop], obj) || path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('pt-br');

  const t = (key: string): string => {
    return getNestedValue(messages[locale], key);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
