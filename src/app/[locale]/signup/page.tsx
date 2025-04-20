"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { supabase } from "@/helper/supabaseClient";
import SignUpForm from "@/components/signup-form";
import Loader from "@/components/shared/loader";

const SignUpPage = () => {
  const t = useTranslations("SigUp");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      if (data.user) {
        setSuccessMessage("Check your email for confirmation!");
      }
    } catch (error) {
      console.error(error);
      setAuthError("An unexpected error occurred");
    }
  };

  if (isLoading) return <Loader isLoading={isLoading} t={t} />;

  return (
    <SignUpForm
      t={t}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isValidEmail={isValidEmail}
      authError={authError}
      successMessage={successMessage}
    />
  );
};

export default SignUpPage;
