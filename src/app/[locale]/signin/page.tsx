"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { supabase } from "@/helper/supabaseClient";
import SignInForm from "@/components/signin-form";
import Loader from "@/components/shared/loader";

const SignInPage = () => {
  const t = useTranslations("SigIn");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setAuthError("");

    if (name === "email") {
      setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      router.push("/collections");
    } catch (error) {
      console.log(error);
      setAuthError("An unexpected error occurred");
    }
  };

  if (isLoading) return <Loader isLoading={isLoading} t={t} />;

  return (
    <SignInForm
      t={t}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isValidEmail={isValidEmail}
      authError={authError}
    />
  );
};

export default SignInPage;
