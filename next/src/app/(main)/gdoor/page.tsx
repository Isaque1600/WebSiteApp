"use client";

import { Main } from "@/_components/main/Main";
import { UtilitiesSection } from "@/_components/main/UtilitiesSection";
import { Button } from "@/_components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/_components/ui/carousel";
import { Skeleton } from "@/_components/ui/skeleton";
import { useEffect, useState } from "react";

type UtilityButton = {
  label: string;
  href: string;
};

type UtilitySection = {
  title: string;
  buttons: UtilityButton[];
};

type ButtonsFile = {
  sections: UtilitySection[];
};

export default function Gdoor() {
  const [buttonsFile, setButtonsFile] = useState<ButtonsFile>({ sections: [] });
  const [sectionState, setSectionState] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadButtons = async () => {
      try {
        const response = await fetch("/buttons.json", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ButtonsFile;

        if (!isMounted) {
          return;
        }

        setButtonsFile(data);
        setSectionState(
          data.sections.reduce(
            (acc, { title }, index) => ({
              ...acc,
              [`${title}-${index}`]: false,
            }),
            {} as Record<string, boolean>,
          ),
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadButtons();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main className="flex-col items-start justify-around gap-y-12 max-xl:flex-wrap max-md:flex-col max-md:items-center max-md:gap-6">
      <Carousel
        className="min-h-20 w-4/5 self-center rounded-lg bg-red-650"
        opts={{}}
      >
        <CarouselContent className="-ml-0">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  key={`carousel-skeleton-${index}`}
                  className="basis-1/3 overflow-hidden rounded-none border-r-2 border-neutral-950 pl-0 first:-ml-0 first:rounded-l-lg last:border-none"
                >
                  <div className="flex min-h-20 items-center px-3">
                    <Skeleton className="h-8 w-full bg-red-300/20" />
                  </div>
                </CarouselItem>
              ))
            : buttonsFile.sections.map(({ title }, index) => (
                <CarouselItem
                  key={`${title}-${index}`}
                  className="basis-1/3 overflow-hidden rounded-none border-r-2 border-neutral-950 pl-0 first:-ml-0 first:rounded-l-lg last:border-none"
                >
                  <Button
                    className="min-h-20 w-full rounded-none bg-transparent hover:bg-red-800"
                    onClick={() =>
                      setSectionState((prev) => ({
                        ...prev,
                        [`${title}-${index}`]:
                          !prev[
                            `${title}-${index}` as keyof typeof sectionState
                          ],
                      }))
                    }
                  >
                    {title}
                  </Button>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="scale-75 bg-transparent text-white" />
        <CarouselNext className="scale-75 bg-transparent text-white" />
      </Carousel>
      <div className="grid w-full grid-cols-3 items-start justify-items-center gap-4 gap-y-8 p-4 transition-all duration-300 max-md:grid-cols-1">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <section
                key={`utility-section-skeleton-${index}`}
                className="flex w-1/2 min-w-[250px] flex-col items-center gap-2 text-lg"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <Skeleton className="h-7 w-1/2" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <Skeleton className="h-[2px] w-full" />
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </section>
            ))
          : buttonsFile.sections.map(({ title, buttons }, index) => (
              <UtilitiesSection
                key={`${title}-${index}`}
                title={title}
                buttons={buttons}
                setIsOpen={() =>
                  setSectionState((prev) => ({
                    ...prev,
                    [`${title}-${index}`]:
                      !prev[`${title}-${index}` as keyof typeof sectionState],
                  }))
                }
                isOpen={
                  sectionState[`${title}-${index}` as keyof typeof sectionState]
                }
              />
            ))}
      </div>
    </Main>
  );
}
