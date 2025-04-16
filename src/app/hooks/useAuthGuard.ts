import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/helper/supabaseClient";

export const useAuthGuard = () => {
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

  return isLoading;
};
