import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner";

// const geist = Geist({subsets:['latin'],variable:'--font-sans'});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "MultiSpace",
    template: "%s | MultiSpace",
  },
  description: "Modern collaboration platform",
  icons: {
    icon: "/assets/favicon_io/favicon.ico",
    shortcut: "/assets/favicon_io/favicon-16x16.png",
    apple: "/assets/favicon_io/apple-touch-icon.png",
  },
  openGraph: {
    title: "MultiSpace",
    description: "Modern collaboration platform",
    url: "https://yourdomain.com",
    siteName: "MultiSpace",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MultiSpace",
    description: "Team collaboration made simple",
    images: ["/og-image.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", GeistSans.variable, GeistMono.variable, spaceGrotesk.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
      </body>
    </html>
  );
}
