import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Fils",
    default: "Fils | Join the conversation with your friends",
  },
  description: "Join the conversation with your friends 👋 Join Fils!",
  applicationName: "Fils social media app",
  authors: [{ name: "vanesascode" }],
  generator: "Next.js",
  keywords: [
    "vnesascode",
    "code",
    "web development",
    "typescript",
    "react",
    "node.js",
    "next.js",
    "web dev",
    "html",
    "css",
    "python",
    "typescript",
    "social media",
    "conversation",
    "chat",
    "vanesa juarez paris",
    "vanesa juarez",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Vanesa Juarez Paris",
  publisher: "Vanesa Juarez Paris",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: neobrutalism }}>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}

// in big screens it's going to go as wide as max-w-4xl
