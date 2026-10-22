import { Inter } from "next/font/google";
import "@/app/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Regular, Medium, SemiBold, Bold
  style: ["normal", "italic"],
  variable: "--font-inter",
});

const SITE_URL = "https://di4nekim.vercel.app";
const SITE_DESCRIPTION = SITE.description;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "di4nekim",
    template: "%s · di4nekim",
  },
  description: SITE_DESCRIPTION,
  applicationName: "di4nekim",
  authors: [{ name: "Diane Kim" }],
  creator: "Diane Kim",
  keywords: [
    "Diane Kim",
    "di4nekim",
    "portfolio",
    "technical product manager",
    "software engineer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "di4nekim",
    title: "di4nekim",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "di4nekim",
    description: SITE_DESCRIPTION,
    creator: "@deadsweetpotato",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/sparkles.svg",
  },
};

export const viewport = {
  themeColor: "#CB0000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
