// 빌드 전 GitHub 메타데이터 동기화. 실패해도 빌드를 막지 않는다 — 기존 캐시(github.generated.json)를 유지한다.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const outFile = fileURLToPath(new URL("src/data/github.generated.json", root));
const src = await readFile(new URL("src/data/projects.ts", root), "utf8");
const repos = [...src.matchAll(/repo:\s*"([^"]+)"/g)].map((m) => m[1]);

const headers = { Accept: "application/vnd.github+json", "User-Agent": "oss-homepage-build" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(15000) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.json();
}

let cache = {};
try { cache = JSON.parse(await readFile(outFile, "utf8")); } catch {}

const next = { ...cache };
let failed = 0;
for (const repo of repos) {
  try {
    const r = await gh(`/repos/${repo}`);
    if (!r) { console.warn(`[sync] ${repo}: 공개 저장소가 아님(404) — 건너뜀`); delete next[repo]; continue; }
    const [languages, release] = await Promise.all([
      gh(`/repos/${repo}/languages`),
      gh(`/repos/${repo}/releases/latest`),
    ]);
    next[repo] = {
      url: r.html_url,
      description: r.description,
      stars: r.stargazers_count,
      forks: r.forks_count,
      openIssues: r.open_issues_count,
      license: r.license?.spdx_id && r.license.spdx_id !== "NOASSERTION" ? r.license.spdx_id : null,
      language: r.language,
      languages: languages ?? {},
      topics: r.topics ?? [],
      pushedAt: r.pushed_at,
      defaultBranch: r.default_branch,
      latestRelease: release ? { tag: release.tag_name, url: release.html_url, publishedAt: release.published_at } : null,
      syncedAt: new Date().toISOString(),
    };
    console.log(`[sync] ${repo}: ★${r.stargazers_count} ${next[repo].license ?? "라이선스 없음"}`);
  } catch (e) {
    failed++;
    console.warn(`[sync] ${repo}: 조회 실패, 캐시 유지 — ${e.message}`);
  }
}

await writeFile(outFile, JSON.stringify(next, null, 2) + "\n", "utf8");
console.log(`[sync] 완료 (${repos.length - failed}/${repos.length})`);
