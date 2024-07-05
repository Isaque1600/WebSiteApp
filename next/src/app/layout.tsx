import { DefaultLayout } from "@/layouts/DefaultLayout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vale da Tecnologia",
  icons: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-neutral-950 text-neutral-50 flex flex-col min-h-screen`}
      >
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
