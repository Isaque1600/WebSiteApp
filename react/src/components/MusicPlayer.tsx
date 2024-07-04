import { Play, Square, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { VolumeController } from "./VolumeController";

export function MusicPlayer() {
  const player = document.getElementsByTagName("audio");
  const [volume, setVolume] = useState(100);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(volume);

  return (
    <div className="flex gap-4 items-center border-2 rounded-md p-2 bg-slate-200 w-fit h-auto">
      <audio className="hidden" />
      <Play
        className="w-auto h-auto text-slate-950"
        onClick={() => {
          player[0].src = "https://stm10.painelvox.com:8486/;?type=http";
          player[0].volume = volume / 100;
          player[0].play();
        }}
      />
      <Square
        className="w-auto h-auto text-slate-950"
        onClick={() => {
          player[0].pause();
          player[0].src = "";
        }}
      />
      <VolumeController
        suffix={
          volume == 0 ? (
            <VolumeX
              onClick={() => {
                setVolume(volumeBeforeMute);
                player[0].muted = false;
              }}
              className="w-12  h-auto p-1 text-slate-950"
            />
          ) : (
            <Volume2
              onClick={() => {
                setVolumeBeforeMute(volume);
                setVolume(0);
                player[0].muted = true;
              }}
              className="w-12 h-auto p-1 text-slate-950"
            />
          )
        }
        value={[volume]}
        onValueChange={(val) => {
          setVolume(val[0]);
          player[0].volume = volume / 100;
          if (volume == 0) {
            player[0].muted = true;
          } else {
            player[0].muted = false;
          }
        }}
        defaultValue={[100]}
        min={0}
        max={100}
      />
    </div>
  );
}
