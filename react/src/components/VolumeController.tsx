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
    <div className="flex items-center gap-2 min-w-24 w-fit">
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
