import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  title: string;
  buttons: {
    label: string;
    href: string;
  }[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function UtilitiesSection({ title, buttons, isOpen, setIsOpen }: Props) {
  return (
    <section
      className="flex w-1/2 min-w-[250px] flex-col items-center gap-2 text-lg"
      key={title}
    >
      <div
        className="flex w-full cursor-pointer items-center justify-between gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="select-none">{title}</h1>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </div>
      <span className="w-full border-b-2 border-white" />
      <div
        className={`pointer-events-none flex max-h-0 w-full flex-col gap-2 overflow-hidden opacity-0 transition-all duration-300 data-[hidden=false]:pointer-events-auto data-[hidden=false]:max-h-96 data-[hidden=false]:overflow-y-auto data-[hidden=false]:opacity-100`}
        data-hidden={!isOpen}
      >
        {buttons.map(({ href, label }) => (
          <a
            className="w-full text-wrap rounded-md bg-red-650 p-2 text-center hover:text-neutral-800"
            href={href}
            target="_blank"
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
