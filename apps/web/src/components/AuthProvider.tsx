"use client";

import { useRestoreSession } from "../hooks/useRestoreSession";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useRestoreSession();

  return children;
}
