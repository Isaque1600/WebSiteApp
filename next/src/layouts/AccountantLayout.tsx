import SideBar from "@/_components/contador/SideBar";

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row h-screen w-screen box-border bg-gray-200">
      <SideBar className="w-[15%] bg-neutral-950 text-neutral-50 h-full rounded-e shadow-slate-800 shadow-lg" />
      <div className="flex flex-col w-[85%] h-full p-4 gap-4">{children}</div>
    </main>
  );
}
