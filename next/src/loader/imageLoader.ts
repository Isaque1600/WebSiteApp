"use client";

import { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  return `${process.env.BASEPATH}/${src}?w=${width}&q=${quality || 75}`;
}
