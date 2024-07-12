import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Vale da Tecnologia",
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
}
