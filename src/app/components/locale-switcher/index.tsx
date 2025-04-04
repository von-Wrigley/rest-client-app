"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "../locale-switcher-select";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      {routing.locales.map((cur) => ({
        value: cur,
        label: t(`locales.${cur}`),
        flagSrc: `/flags/${cur}.png`,
      }))}
    </LocaleSwitcherSelect>
  );
}
