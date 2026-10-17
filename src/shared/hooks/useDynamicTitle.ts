import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useMatches } from "react-router-dom";

export function useDynamicPageTitle(): void {
  const { t, i18n } = useTranslation();
  const matches = useMatches();
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    let titleKey: string | undefined;
    // Vue merges parent-to-child metadata; a child's explicit title takes precedence.
    for (const { handle } of matches) {
      if (typeof handle === "object" && handle !== null && "pageTitle" in handle) {
        titleKey = typeof handle.pageTitle === "string" ? handle.pageTitle : undefined;
      }
    }

    const siteTitle = t("app.brand.name");
    document.title = titleKey ? `${t(titleKey)} — ${siteTitle}` : siteTitle;
  }, [matches, pathname, search, hash, t, i18n.language]);
}
