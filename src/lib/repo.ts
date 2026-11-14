import data from "../data/github.generated.json";
import site from "../data/site.json";
import { projects, type Project } from "../data/projects";

export interface RepoMeta {
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  license: string | null;
  language: string | null;
  languages: Record<string, number>;
  pushedAt: string;
  latestRelease: { tag: string; url: string; publishedAt: string } | null;
}

const meta = data as unknown as Record<string, RepoMeta>;
export const repoMeta = (p: Project): RepoMeta | undefined => meta[p.repo];
export const repoUrl = (p: Project) => repoMeta(p)?.url ?? `https://github.com/${p.repo}`;
export const orgUrl = `https://github.com/${site.site.githubOrg}`;

// GitHub linguist 색 (자주 쓰는 것만). 없으면 회색.
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Dart: "#00b4ab", Kotlin: "#a97bff", Swift: "#f05138",
  Python: "#3572a5", Go: "#00add8", Rust: "#dea584", PHP: "#4f5d95", Java: "#b07219", "C++": "#f34b7d",
  C: "#555555", "C#": "#178600", HTML: "#e34c26", CSS: "#663399", SCSS: "#c6538c", Shell: "#89e051",
  Astro: "#ff5a03", Vue: "#41b883", Ruby: "#701516", "Objective-C": "#438eff", Dockerfile: "#384d54",
};
export const langColor = (l: string) => LANG_COLORS[l] ?? "#8b949e";

/** 언어 비율 상위 4개 + 나머지(기타). */
export function languageShares(m?: RepoMeta) {
  if (!m) return [];
  const entries = Object.entries(m.languages).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  if (!total) return m.language ? [{ name: m.language, pct: 100, color: langColor(m.language) }] : [];
  const top = entries.slice(0, 4).map(([name, v]) => ({ name, pct: (v / total) * 100, color: langColor(name) }));
  const rest = 100 - top.reduce((s, x) => s + x.pct, 0);
  if (rest >= 0.5) top.push({ name: "Other", pct: rest, color: "#8b949e" });
  return top;
}

export function stats() {
  const live = projects.filter((p) => p.status === "released");
  const metas = live.map(repoMeta).filter(Boolean) as RepoMeta[];
  const langs = new Set(metas.flatMap((m) => Object.keys(m.languages)));
  return {
    released: live.length,
    forks: metas.reduce((s, m) => s + m.forks, 0),
    stars: metas.reduce((s, m) => s + m.stars, 0),
    languages: langs.size,
  };
}
