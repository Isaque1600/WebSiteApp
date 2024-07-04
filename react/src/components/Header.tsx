import logo from "@/assets/imgs/contact_info.png";

export function Header() {
  return (
    <header className="flex flex-col justify-between h-auto w-auto pt-[5px] mr-[22.5px] ml-[22.5px] gap-y-4">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="max-w-[80%]" />
      </div>
    </header>
  );
}
