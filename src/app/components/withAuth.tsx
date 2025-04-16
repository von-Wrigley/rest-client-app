"use client";

import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/helper/supabaseClient";

type WithAuthProps = {};

function withAuth<P extends WithAuthProps>(WrappedComponent: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/unauthorized");
        } else {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
