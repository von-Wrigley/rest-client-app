import type { Metadata } from "next";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Final Task App",
  description: "REST Client App for Rolling Scopes School",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="layoutContainer">
        <Header />
        <main className="contentArea">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
