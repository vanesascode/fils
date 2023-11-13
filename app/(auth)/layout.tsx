//  File to allow us to specify different rules for the authentication route:

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Threds",
  description:
    "A Next.js 14 Threads Application similar to Meta's Thread or X's Twitter",
};

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

//the ClerkProvider wrapping allows us to use all of the clerk's functionalities
