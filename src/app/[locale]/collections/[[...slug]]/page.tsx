export const dynamic = "force-dynamic";

import AuthGuard from "@/components/shared/auth-guard";
import React, { lazy, Suspense } from "react";

const CollectionsWrapper = lazy(
  () => import("@/components/collections/collections-wrapper")
);

interface Props {
  params: { locale: string; slug?: string[] };
  searchParams: { [key: string]: string };
}

const CollectionsPage = async ({ params, searchParams }: Props) => {
  const { slug = [] } = await params;
  const awaitedSearchParams = await searchParams;

  const [method = "UNDEFINED", encodedUrl, encodedBody] = slug;

  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <AuthGuard>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <CollectionsWrapper
            method={method}
            encodedUrl={encodedUrl}
            encodedBody={encodedBody}
            searchParams={awaitedSearchParams}
          />
        </Suspense>
      </AuthGuard>
    </Suspense>
  );
};

export default CollectionsPage;
