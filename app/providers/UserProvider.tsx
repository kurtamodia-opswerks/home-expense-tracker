// providers/UserProvider.tsx
"use client";

import { createContext, useContext } from "react";
import { SelectUser } from "@/db/schema";

const UserContext = createContext<SelectUser | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: SelectUser | null;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
