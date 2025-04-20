"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Unauthorized from "@/components/unauthorized";

const UnauthorizedPage = () => {
  const t = useTranslations("UnauthorizedPage");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return <Unauthorized isLoading={isLoading} t={t} />;
};

export default UnauthorizedPage;
