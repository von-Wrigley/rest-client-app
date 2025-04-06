import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Header from "../components/header";
import Footer from "../components/footer";
import "@/styles/globals.scss";


export const metadata: Metadata = {
  title: "Final Task App",
  description: "REST Client App for Rolling Scopes School",
};

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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <ErrorBoundary>
            <Header />
            <main className="contentArea">{children}</main>
            <Footer />
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
