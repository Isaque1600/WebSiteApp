import SideBar from "@/_components/contador/SideBar";

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="box-border flex h-screen w-screen flex-row bg-gray-200">
      <SideBar className="h-full w-[15%] rounded-e bg-neutral-950 text-neutral-50 shadow-lg shadow-slate-800" />
      <div className="flex h-full w-[85%] flex-col gap-4 p-4">{children}</div>
    </main>
  );
}
