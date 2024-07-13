import AdmLayout from "@/layouts/AdmLayout";

type Props = {
  children?: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <AdmLayout>{children}</AdmLayout>
    </>
  );
}
