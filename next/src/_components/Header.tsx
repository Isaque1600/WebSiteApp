import contact_info from "@/assets/imgs/contact_info.png";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex flex-col justify-between h-auto w-auto pt-[5px] mr-[22.5px] ml-[22.5px] gap-y-4">
      <div className="flex justify-center">
        <Image src={contact_info} alt="logo" className="max-w-[80%]" />
      </div>
    </header>
  );
}
