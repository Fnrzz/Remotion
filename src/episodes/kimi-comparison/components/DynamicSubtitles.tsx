import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FullCanvasOverlays } from "../../../components/FullCanvasOverlays";
import type { CharacterEmotion } from "../../../data/character";
import captions from "../data/subtitles.json";
import timing from "../data/timing.json";

const cues: { fromMs: number; emotion: CharacterEmotion; voiceover: string }[] =
  [
    { fromMs: 0, emotion: "neutral", voiceover: "Harga AI buat coding" },
    {
      fromMs: timing.fiveTimes * 1000,
      emotion: "surprised",
      voiceover: "lima kali lipat",
    },
    {
      fromMs: timing.question * 1000,
      emotion: "curious",
      voiceover: "Tapi performanya?",
    },
    {
      fromMs: timing.models * 1000,
      emotion: "friendly",
      voiceover: "Kita bandingin tiga model",
    },
    {
      fromMs: timing.pricing * 1000,
      emotion: "lookingLeft",
      voiceover: "Tarif API standar",
    },
    {
      fromMs: timing.code * 1000,
      emotion: "lookingLeft",
      voiceover: "Kimi Code Bench",
    },
    {
      fromMs: timing.terminal * 1000,
      emotion: "curious",
      voiceover: "Tapi di angka Terminal-Bench",
    },
    {
      fromMs: timing.configuration * 1000,
      emotion: "skeptical",
      voiceover: "Pengaturan tesnya nggak selalu sama",
    },
    {
      fromMs: timing.closing * 1000,
      emotion: "neutral",
      voiceover: "Harga per token belum tentu biaya proyek",
    },
    {
      fromMs: timing.choice * 1000,
      emotion: "curious",
      voiceover: "Lebih pilih tarif hemat atau performa yang cocok?",
    },
  ];

// One persistent subtitle node and stationary character: no per-caption remounts.
// Keep the approved full-canvas overlays and bottom whitespace unchanged.
export const DynamicSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dark =
    frame < Math.round(timing.models * fps) ||
    frame >= Math.round(timing.closing * fps);
  return (
    <>
      <div data-kimi-frame={frame} style={{ display: "none" }} />
      <FullCanvasOverlays captions={captions} cues={cues} dark={dark} />
    </>
  );
};
