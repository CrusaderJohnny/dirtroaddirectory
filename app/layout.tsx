import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/core/styles/Button.css';
import '@mantine/carousel/styles.css';
import {ColorSchemeScript, mantineHtmlProps} from "@mantine/core";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import MantineThemeWrapper from "@/app/mantineTheme";
import {Analytics} from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dirt Road Directory",
  description: "The place to find farmers markets near you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <ClerkProvider>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          {GA_MEASUREMENT_ID && (
              <>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                      __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
                    }}
                />
              </>
          )}
          <ColorSchemeScript/><title></title>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <MantineThemeWrapper>
            {children}
            <Analytics/>
          </MantineThemeWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
