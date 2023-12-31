import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { neobrutalism } from "@clerk/themes";

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
    "vanesascode",
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

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: neobrutalism }}>
      <html lang="en">
        <body className={`${inter.className} bg-dark-2 dark:bg-green-2`}>
          <div className="w-full flex justify-center items-center ">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
