import { useAppStore, type PrimaryTab } from "@/entities/app/model/app-store";

export const primaryTabPaths: Record<PrimaryTab, string> = {
  main: "/",
  about: "/about",
  "knowledge-base": "/knowledge-base",
  "log-analysis": "/log-analysis",
  "party-management": "/party-management",
};

function normalizePathname(pathname: string) {
  const trimmedPath = pathname.replace(/\/+$/, "");
  return trimmedPath || "/";
}

export function getPrimaryTabForPath(pathname: string): PrimaryTab | null {
  const normalizedPathname = normalizePathname(pathname);

  return (Object.entries(primaryTabPaths) as [PrimaryTab, string][]).find(
    ([, path]) => path === normalizedPathname,
  )?.[0] ?? null;
}

export function navigateToPrimaryTab(tab: PrimaryTab) {
  const path = primaryTabPaths[tab];

  if (normalizePathname(window.location.pathname) !== path) {
    window.history.pushState(null, "", path);
  }

  useAppStore.getState().setActivePrimaryTab(tab);
}
