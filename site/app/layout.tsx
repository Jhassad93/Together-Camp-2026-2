import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";

const title = "Together Camp 2026.2 · Ekballo · 19 a 22 de novembro";
const description =
  "Acampamento de adolescentes e jovens (12 a 25 anos) da AD Bereana, no feriadão de 19 a 22/11 no Berecamp, em Arujá/SP. 80 vagas, inscrições até 15/11.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Together Camp 2026.2",
    title: "Together Camp 2026.2 · Ekballo",
    description: "19 a 22 de novembro, no Berecamp. Só 80 vagas. Bora?",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Together Camp 2026.2 · Ekballo · 19 a 22 de novembro" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = { themeColor: "#FFCD12", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/fonts/big-shoulders-display-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/google-sans-flex.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <CookieConsent />
        {/* Vercel Web Analytics: sem cookies e sem identificar o visitante; por isso não passa pelo banner */}
        <Analytics />
      </body>
    </html>
  );
}
