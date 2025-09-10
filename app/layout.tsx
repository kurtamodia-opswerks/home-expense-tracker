import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/navigation/Navbar";
import { UserProvider } from "@/providers/UserProvider";
import { getOrCreateUser } from "./data/user/get-or-create-user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description:
    "A simple expense tracker to keep track of your house expenses and share them with your housemates.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getOrCreateUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider user={user}>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
