import type { Metadata } from "next";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Final Task App",
  description: "REST Client App for Rolling Scopes School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="layoutContainer">
        <ErrorBoundary>
          <Header />
          <main className="contentArea">{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
