/**
 * 소개할 MintSoft 오픈소스 프로젝트 목록 — 이 파일이 정본이다.
 * 카드 문구(소개·특징)는 언어별 사전 src/data/i18n/<code>.ts 의 projects 에 있다.
 * 별·포크·언어 비율·라이선스·최근 커밋·최신 릴리스는 빌드 시 scripts/sync-github.mjs 가 GitHub 에서 채운다.
 *
 * 카드를 누르면 바로 밖으로 나간다: homepage 가 있으면 그 사이트, 없으면 GitHub 저장소.
 * status
 *  - "released"  : 공개 저장소 + LICENSE 가 갖춰진 프로젝트.
 *  - "preparing" : 공개 준비 중. 카드만 흐리게 노출하고 링크하지 않는다.
 */
export type { Locale } from "./locales";
import type { ProjectSlug } from "./i18n/types";
export type Category = "desktop" | "devtool" | "selfhost" | "library";

export interface Project {
  slug: ProjectSlug;
  repo: string; // "owner/name"
  name: string;
  status: "released" | "preparing";
  category: Category;
  /** 전용 소개 사이트. 있으면 카드가 GitHub 대신 이 주소로 간다. */
  homepage?: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    slug: "notikit",
    repo: "mintsoft-opensource/notikit",
    name: "Notikit",
    status: "released",
    category: "selfhost",
    homepage: "https://notikit.mint-soft.com",
    tags: ["push-notifications", "self-hosted", "fcm"],
  },
  {
    slug: "btop-gui",
    repo: "mintsoft-opensource/btop-gui",
    name: "btop-gui",
    status: "released",
    category: "desktop",
    tags: ["tauri", "rust", "system-monitor"],
  },
  {
    slug: "pm2-gui",
    repo: "mintsoft-opensource/pm2-gui",
    name: "pm2-gui",
    status: "released",
    category: "desktop",
    tags: ["tauri", "nextjs", "pm2"],
  },
  {
    slug: "pane-sticker",
    repo: "mintsoft-opensource/pane-sticker",
    name: "PaneSticker",
    status: "released",
    category: "devtool",
    tags: ["windows-terminal", "wpf", "csharp"],
  },
];

export const released = () => projects.filter((p) => p.status === "released");
