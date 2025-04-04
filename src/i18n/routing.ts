import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "ru", "ka", "pl"],
  defaultLocale: "en",
});
