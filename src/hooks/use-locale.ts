import { useEffect, useState } from "react";

export type SiteLocale = "pt" | "en";

export function useLocale(): SiteLocale {
  const [locale, setLocale] = useState<SiteLocale>("pt");

  useEffect(() => {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const usesPortuguese = languages.some((language) => language?.toLowerCase().startsWith("pt"));
    const nextLocale = usesPortuguese ? "pt" : "en";
    document.documentElement.lang = nextLocale === "pt" ? "pt-BR" : "en";
    setLocale(nextLocale);
  }, []);

  return locale;
}
