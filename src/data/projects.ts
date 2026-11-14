/**
 * 소개할 MintSoft 오픈소스 프로젝트 목록 — 이 파일이 정본이다.
 * 별·포크·언어 비율·라이선스·최근 커밋·최신 릴리스는 빌드 시 scripts/sync-github.mjs 가 GitHub 에서 채운다.
 *
 * status
 *  - "released"  : 공개 저장소 + LICENSE 가 갖춰진 프로젝트. 목록·상세 페이지가 열린다.
 *  - "preparing" : 공개 준비 중. 카드만 흐리게 노출하고 상세 페이지·설치 명령은 만들지 않는다.
 */
export type Locale = "ko" | "en";
export type L10n = Record<Locale, string>;

export interface Project {
  slug: string;
  repo: string; // "owner/name"
  name: string;
  status: "released" | "preparing";
  category: "app" | "library" | "tool" | "extension" | "asset";
  tagline: L10n;
  description: L10n;
  features?: Record<Locale, string[]>;
  /** 상세 페이지 "시작하기" 에 보여줄 셸 명령. 없으면 git clone 만 보여준다. */
  install?: string[];
  homepage?: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    slug: "tabflow",
    repo: "mintsoft-app-series/tabflow-extension",
    name: "TabFlow",
    status: "preparing",
    category: "extension",
    tagline: {
      ko: "쌓여 가는 탭을 흐름대로 정리하는 크롬 확장",
      en: "A Chrome extension that keeps piling tabs in flow",
    },
    description: {
      ko: "열어 둔 탭을 작업 단위로 묶고, 잠시 접어 두었다가 한 번에 다시 여는 스마트 탭 매니저입니다.",
      en: "A smart tab manager that groups open tabs by task, parks them, and restores them in one click.",
    },
    tags: ["chrome-extension", "typescript", "productivity"],
  },
];

export const released = () => projects.filter((p) => p.status === "released");
