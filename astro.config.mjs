// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/data/site.json" with { type: "json" };

export default defineConfig({
  site: site.url,
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap({ i18n: { defaultLocale: "ko", locales: { ko: "ko-KR", en: "en-US" } } })],
  vite: { plugins: [tailwindcss()] },
});
