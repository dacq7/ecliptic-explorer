import type { Metadata } from "next";
import { Cinzel, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/shared/Navbar";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecliptic-explorer.vercel.app"),
  title: {
    template: "%s | Ecliptic Explorer",
    default: "Tu signo está mal. | Ecliptic Explorer",
  },
  description:
    "La astrología usa 12 signos de 30 días. La astronomía tiene 13 constelaciones y períodos desiguales. Descubre tu signo real según la IAU. Gratis.",
  keywords: [
    "signo zodiacal real",
    "mi signo real",
    "13 constelaciones zodíaco",
    "ofiuco signo",
    "signo astronómico IAU",
    "zodíaco real astronomía",
    "verdadero signo zodiaco",
  ],
  authors: [{ name: "Ecliptic Explorer" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_LA",
    alternateLocale: ["en_US"],
    siteName: "Ecliptic Explorer",
    title: "Tu signo está mal.",
    description:
      "La astrología usa 12 signos iguales. La astronomía tiene 13 constelaciones con períodos reales. Escorpio: 7 días. Virgo: 44 días. ¿Cuál es el tuyo?",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu signo está mal.",
    description:
      "La astronomía tiene 13 constelaciones. Escorpio dura 7 días. Virgo, 44. Descubre tu signo real según la IAU.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
