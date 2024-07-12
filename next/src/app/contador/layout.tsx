import AccountantLayout from "@/layouts/AccountantLayout";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "cliente",
  icons: "",
};

type ContadorLayoutProps = {
  children: React.ReactNode;
};

export default function ContadorLayout({ children }: ContadorLayoutProps) {
  return <AccountantLayout>{children}</AccountantLayout>;
}
