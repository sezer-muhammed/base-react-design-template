"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { hasPermission, type Permission } from "@/server/access-control";
import type { PlatformSession } from "@/server/contracts/platform";

type AppContextValue = {
  session: PlatformSession | null;
  can: (permission: Permission) => boolean;
};

const AppContext = createContext<AppContextValue>({
  session: null,
  can: () => false,
});

export function AppProviders({
  children,
  session = null,
}: {
  children: ReactNode;
  session?: PlatformSession | null;
}) {
  const value: AppContextValue = {
    session,
    can: (permission) =>
      session ? hasPermission(session.membership.role, permission) : false,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
