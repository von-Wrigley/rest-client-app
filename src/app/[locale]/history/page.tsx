import AuthGuard from "@/components/shared/auth-guard";
import React, { lazy, Suspense } from "react";

const History = lazy(() => import("@/components/history"));

const HistoryPage = async () => {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <AuthGuard>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <History />
        </Suspense>
      </AuthGuard>
    </Suspense>
  );
};

export default HistoryPage;
