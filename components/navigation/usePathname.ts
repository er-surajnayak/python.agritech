import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

export function usePathname() {
  return useSyncExternalStore(subscribe, () => window.location.pathname, () => "/");
}
