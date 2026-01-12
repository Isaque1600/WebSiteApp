import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster position="bottom-right" closeButton={true} />
      </body>
    </html>
  );
}
