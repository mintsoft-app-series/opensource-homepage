// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { LOCALES } from "./src/data/locales.ts";
import { site } from "./src/data/site.json" with { type: "json" };

export default defineConfig({
  site: site.url,
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap({ i18n: { defaultLocale: "ko", locales: Object.fromEntries(Object.entries(LOCALES).map(([k, v]) => [k, v.bcp47])) } })],
  vite: { plugins: [tailwindcss()] },
});
