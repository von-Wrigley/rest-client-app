"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/helper/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        router.push("/collections");
      }
    });
  }, [router]);

  return <div>Loading...</div>;
}
