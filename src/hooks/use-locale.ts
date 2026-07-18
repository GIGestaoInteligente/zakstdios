import { useEffect, useState } from "react";

export type SiteLocale = "pt" | "en";

const STORAGE_KEY = "mana-house-locale";
const LOCALE_EVENT = "mana-house-locale-change";

function applyDocumentLocale(locale: SiteLocale) {
  document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
}

export function setSiteLocale(locale: SiteLocale) {
  window.localStorage.setItem(STORAGE_KEY, locale);
  applyDocumentLocale(locale);
  window.dispatchEvent(new CustomEvent<SiteLocale>(LOCALE_EVENT, { detail: locale }));
}

export function useLocale(): SiteLocale {
  const [locale, setLocale] = useState<SiteLocale>("pt");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const usesPortuguese = languages.some((language) => language?.toLowerCase().startsWith("pt"));
    const nextLocale: SiteLocale =
      storedLocale === "pt" || storedLocale === "en" ? storedLocale : usesPortuguese ? "pt" : "en";

    applyDocumentLocale(nextLocale);
    setLocale(nextLocale);

    const handleLocaleChange = (event: Event) => {
      const next = (event as CustomEvent<SiteLocale>).detail;
      applyDocumentLocale(next);
      setLocale(next);
    };

    window.addEventListener(LOCALE_EVENT, handleLocaleChange);
    return () => window.removeEventListener(LOCALE_EVENT, handleLocaleChange);
  }, []);

  return locale;
}
