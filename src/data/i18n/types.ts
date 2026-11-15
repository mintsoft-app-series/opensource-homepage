import type { Category } from "../projects";

export type ProjectSlug = "notikit" | "btop-gui" | "pm2-gui" | "pane-sticker";
export interface ProjectCopy { tagline: string; highlights: [string, string, string] }

/** 언어별 사전의 모양. 모든 언어 파일이 이 타입을 빠짐없이 채운다. */
export interface Dict {
  metaTitle: string;
  metaDesc: string;
  navProjects: string;
  navContribute: string;
  navApps: string;
  language: string;
  heroEyebrow: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;
  ctaProjects: string;
  ctaGithub: string;
  statProjects: string;
  statStars: string;
  statLanguages: string;
  statForks: string;
  projectsTitle: string;
  projectsSub: string;
  filterAll: string;
  cat: Record<Category, string>;
  preparing: string;
  preparingNote: string;
  emptyReleased: string;
  lastCommit: string;
  noLicense: string;
  principlesTitle: string;
  principles: [{ t: string; d: string }, { t: string; d: string }, { t: string; d: string }];
  contributeTitle: string;
  contributeSub: string;
  steps: [string, string, string];
  /** 기여 예시의 커밋 메시지 본문 (conventional prefix 뒤). */
  commitExample: string;
  contactLine: string;
  copy: string;
  copied: string;
  viewOnGithub: string;
  visitSite: string;
  footerTag: string;
  notFound: string;
  toggleTheme: string;
  /** 카드 문구 — projects.ts 의 slug 가 키. */
  projects: Record<ProjectSlug, ProjectCopy>;
}
