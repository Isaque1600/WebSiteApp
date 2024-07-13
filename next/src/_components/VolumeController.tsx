import { SliderProps } from "@radix-ui/react-slider";
import { Slider } from "./ui/slider";

type VolumeControllerProps = SliderProps & {
  suffix: React.ReactNode;
};

export function VolumeController({
  suffix,
  defaultValue,
  value,
  min,
  max,
  onValueChange,
  ...props
}: VolumeControllerProps) {
  return (
    <div className="flex w-fit min-w-24 items-center gap-2">
      <Slider
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={1}
        onValueChange={onValueChange}
        {...props}
      />
      {suffix}
    </div>
  );
}
