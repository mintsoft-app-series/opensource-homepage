import site from "../data/site.json";
export const GET = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.site.url}/sitemap-index.xml\n`, { headers: { "Content-Type": "text/plain" } });
