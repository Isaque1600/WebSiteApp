"use client";

import { Play, Square, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { VolumeController } from "./VolumeController";

export function MusicPlayer() {
  const player = useRef({} as HTMLAudioElement);
  const [volume, setVolume] = useState(100);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(volume);

  return (
    <div className="flex h-auto w-fit items-center gap-4 rounded-md border-2 bg-slate-200 p-2">
      <audio className="hidden" ref={player} />
      <Play
        className="h-auto w-auto text-slate-950"
        onClick={() => {
          player.current.src = "https://stm10.painelvox.com:8486/;?type=http";
          player.current.volume = volume / 100;
          player.current.play();
        }}
      />
      <Square
        className="h-auto w-auto text-slate-950"
        onClick={() => {
          player.current.pause();
          player.current.src = "";
        }}
      />
      <VolumeController
        suffix={
          volume == 0 ? (
            <VolumeX
              onClick={() => {
                setVolume(volumeBeforeMute);
                player.current.muted = false;
              }}
              className="h-auto w-12 p-1 text-slate-950"
            />
          ) : (
            <Volume2
              onClick={() => {
                setVolumeBeforeMute(volume);
                setVolume(0);
                player.current.muted = true;
              }}
              className="h-auto w-12 p-1 text-slate-950"
            />
          )
        }
        value={[volume]}
        onValueChange={(val) => {
          setVolume(val[0]);
          player.current.volume = volume / 100;
          if (volume == 0) {
            player.current.muted = true;
          } else {
            player.current.muted = false;
          }
        }}
        defaultValue={[100]}
        min={0}
        max={100}
      />
    </div>
  );
}
