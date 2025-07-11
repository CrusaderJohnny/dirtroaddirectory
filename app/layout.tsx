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
  return (
    <ClerkProvider>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript/><title></title>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <MantineThemeWrapper>{children}</MantineThemeWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
