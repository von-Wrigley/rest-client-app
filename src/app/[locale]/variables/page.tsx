import AuthGuard from "@/components/shared/auth-guard";
import React, { lazy, Suspense } from "react";

const Variables = lazy(() => import("@/components/variables"));

const VariablesPage = async () => {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <AuthGuard>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Variables />
        </Suspense>
      </AuthGuard>
    </Suspense>
  );
};

export default VariablesPage;
