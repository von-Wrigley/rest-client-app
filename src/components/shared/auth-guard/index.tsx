"use client";

import { ReactNode } from "react";
import { useAuthGuard } from "../../../app/hooks/useAuthGuard";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const isLoading = useAuthGuard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
