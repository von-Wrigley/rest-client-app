import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Header from "../components/header";
import Footer from "../components/footer";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <ErrorBoundary>
        <Header />
        <main className="contentArea">{children}</main>
        <Footer />
      </ErrorBoundary>
    </NextIntlClientProvider>
  );
}
