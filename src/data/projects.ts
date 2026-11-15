/**
 * 소개할 MintSoft 오픈소스 프로젝트 목록 — 이 파일이 정본이다.
 * 별·포크·언어 비율·라이선스·최근 커밋·최신 릴리스는 빌드 시 scripts/sync-github.mjs 가 GitHub 에서 채운다.
 *
 * 카드를 누르면 바로 밖으로 나간다: homepage 가 있으면 그 사이트, 없으면 GitHub 저장소.
 * status
 *  - "released"  : 공개 저장소 + LICENSE 가 갖춰진 프로젝트.
 *  - "preparing" : 공개 준비 중. 카드만 흐리게 노출하고 링크하지 않는다.
 */
export type Locale = "ko" | "en";
export type L10n = Record<Locale, string>;
export type Category = "desktop" | "devtool" | "selfhost" | "library";

export interface Project {
  slug: string;
  repo: string; // "owner/name"
  name: string;
  status: "released" | "preparing";
  category: Category;
  tagline: L10n;
  /** 카드에 보여줄 핵심 특징 2~3개. */
  highlights?: Record<Locale, string[]>;
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
    tagline: {
      ko: "토큰이 아니라 '사용자'에게 보내는 셀프호스트 푸시 알림 툴킷",
      en: "A self-hostable push toolkit that targets users, not tokens",
    },
    highlights: {
      ko: ["FCM 위에 사용자·계정 레이어", "Web·Android·iOS·Flutter·React Native SDK", "docker compose 한 번으로 설치"],
      en: ["User & account layer on top of FCM", "Web · Android · iOS · Flutter · React Native SDKs", "One docker compose up"],
    },
    tags: ["push-notifications", "self-hosted", "fcm"],
  },
  {
    slug: "btop-gui",
    repo: "mintsoft-opensource/btop-gui",
    name: "btop-gui",
    status: "released",
    category: "desktop",
    tagline: {
      ko: "btop 에서 영감을 받은 크로스플랫폼 GUI 시스템 모니터",
      en: "A btop-inspired cross-platform GUI system monitor",
    },
    highlights: {
      ko: ["CPU·메모리·디스크·네트워크·프로세스 실시간 그래프", "원격 서버는 경량 WebSocket 에이전트로", "macOS · Windows · Linux"],
      en: ["Live CPU, memory, disk, network & process graphs", "Remote servers via a light WebSocket agent", "macOS · Windows · Linux"],
    },
    tags: ["tauri", "rust", "system-monitor"],
  },
  {
    slug: "pm2-gui",
    repo: "mintsoft-opensource/pm2-gui",
    name: "pm2-gui",
    status: "released",
    category: "desktop",
    tagline: {
      ko: "PM2 프로세스 관리를 한 창에서 — 실시간 로그를 갖춘 크로스플랫폼 데스크톱 GUI",
      en: "A cross-platform desktop GUI for the PM2 process manager with live logs",
    },
    highlights: {
      ko: ["프로세스 표·재시작/중지·상세 지표를 한눈에", "stdout/stderr 실시간 로그와 검색·병합 보기", "macOS · Windows · Linux"],
      en: ["Process table, restart/stop and runtime metrics at a glance", "Live stdout/stderr tail with search and merged view", "macOS · Windows · Linux"],
    },
    tags: ["tauri", "nextjs", "pm2"],
  },
  {
    slug: "pane-sticker",
    repo: "mintsoft-opensource/pane-sticker",
    name: "PaneSticker",
    status: "released",
    category: "devtool",
    tagline: {
      ko: "Windows Terminal 의 모든 분할 창에 실제 작업 폴더를 붙여 주는 오버레이",
      en: "An overlay that labels every Windows Terminal pane with its real working directory",
    },
    highlights: {
      ko: ["분할·크기 변경·이동을 실시간 추적", "Claude Code 같은 에이전트가 폴더를 옮겨도 프로젝트 루트 유지", "설치 없이 실행하는 단일 .exe"],
      en: ["Follows splits, resizes and moves live", "Stays on the project root while agents like Claude Code hop folders", "Single portable .exe"],
    },
    tags: ["windows-terminal", "wpf", "csharp"],
  },
];

export const released = () => projects.filter((p) => p.status === "released");
