import contact_info from "@/assets/imgs/contact_info.png";
import Image from "next/image";

export function Header() {
  return (
    <header className="ml-[22.5px] mr-[22.5px] flex h-auto w-auto flex-col justify-between gap-y-4 pt-[5px]">
      <div className="flex justify-center">
        <Image src={contact_info} alt="logo" className="max-w-[80%]" />
      </div>
    </header>
  );
}
