import { Section } from "./section/Section";

export function UnderConstruct() {
  return (
    <Section.Root>
      <Section.Title>
        Em Construção
        <span className="inline-block animate-bounce duration-1000 ease-in-out [animation-delay:0ms]">
          .
        </span>
        <span className="inline-block animate-bounce duration-1000 ease-in-out [animation-delay:150ms]">
          .
        </span>
        <span className="inline-block animate-bounce duration-1000 ease-in-out [animation-delay:300ms]">
          .
        </span>
      </Section.Title>
    </Section.Root>
  );
}
