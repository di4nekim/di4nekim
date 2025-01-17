import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Regular, SemiBold, Bold
  variable: '--font-inter',
});

export const metadata = {
  title: "di4nekim",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/sparkles.svg"></link>
      </head>
      <SpeedInsights />
      <body
        className={inter.variable}
      >
        {children}
      </body>
    </html>
  );
}
