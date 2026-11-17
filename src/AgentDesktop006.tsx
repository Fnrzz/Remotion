import React from "react";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import {
  AbsoluteFill,
  Audio,
  type CalculateMetadataFunction,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FullCanvasOverlays } from "./components/FullCanvasOverlays";
import { FONT_FAMILY } from "./fonts";
import timing from "./episodes/agent-desktop/data/timing.json";
import captions from "./episodes/agent-desktop/data/subtitles.json";
import { AGENT_CHARACTER_CUES } from "./episodes/agent-desktop/data/character";
import { HookScene } from "./episodes/agent-desktop/scenes/HookScene";
import { ProductRevealScene } from "./episodes/agent-desktop/scenes/ProductRevealScene";
import { ComputerUseScene } from "./episodes/agent-desktop/scenes/ComputerUseScene";
import { LimitationsScene } from "./episodes/agent-desktop/scenes/LimitationsScene";
import {
  ClosingScene,
  PrivacyScene,
} from "./episodes/agent-desktop/scenes/PrivacyClosingScene";

export type AgentDesktopProps = { audioSrc: string };

export const calculateAgentDesktopMetadata: CalculateMetadataFunction<
  AgentDesktopProps
> = async ({ props }) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error("VO agent-desktop tidak tersedia atau tidak valid.");
  if (Math.abs(seconds - timing.audioSeconds) > 0.08)
    throw new Error(
      "VO berubah. Sinkronkan ulang timing kata dan subtitle sebelum ekspor.",
    );
  return { durationInFrames: Math.ceil(seconds * 30) };
};

const StableOverlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dark =
    frame < Math.round(timing.revealScene * fps) ||
    (frame >= Math.round(timing.limits * fps) &&
      frame < Math.round(timing.privacy * fps)) ||
    frame >= Math.round(timing.closing * fps);
  return (
    <>
      <div data-ad-frame={frame} style={{ display: "none" }} />
      <FullCanvasOverlays
        captions={captions}
        cues={AGENT_CHARACTER_CUES}
        dark={dark}
      />
    </>
  );
};

export const AgentDesktop006: React.FC<AgentDesktopProps> = ({ audioSrc }) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#FAF9F6", fontFamily: FONT_FAMILY }}
    >
      <Audio
        name="VO asli ElevenLabs — tanpa perubahan kecepatan"
        src={staticFile(audioSrc)}
      />
      <div
        data-ad-design
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "top left",
          scale: `${width / 1080} ${height / 1920}`,
        }}
      >
        <Sequence
          name="01 — Dari jawaban ke klik dan ngetik"
          durationInFrames={Math.round(timing.revealScene * fps)}
        >
          <HookScene
            click={timing.click}
            typing={timing.typing}
            connect={timing.connect}
          />
        </Sequence>
        <Sequence
          name="02 — agent-desktop: tool, bukan agent mandiri"
          from={Math.round(timing.revealScene * fps)}
          durationInFrames={
            Math.round(timing.computer * fps) -
            Math.round(timing.revealScene * fps)
          }
        >
          <ProductRevealScene
            notAgent={
              timing.notAgent - Math.round(timing.revealScene * fps) / fps
            }
            reveal={timing.reveal - Math.round(timing.revealScene * fps) / fps}
            clarify={
              timing.clarify - Math.round(timing.revealScene * fps) / fps
            }
            architecture={
              timing.architecture - Math.round(timing.revealScene * fps) / fps
            }
          />
        </Sequence>
        <Sequence
          name="03 — Baca struktur → kirim tindakan → observasi baru"
          from={Math.round(timing.computer * fps)}
          durationInFrames={
            Math.round(timing.limits * fps) - Math.round(timing.computer * fps)
          }
        >
          <ComputerUseScene
            read={timing.read - Math.round(timing.computer * fps) / fps}
            reread={timing.reread - Math.round(timing.computer * fps) / fps}
            action={timing.action - Math.round(timing.computer * fps) / fps}
            check={timing.check - Math.round(timing.computer * fps) / fps}
            summary={timing.summary - Math.round(timing.computer * fps) / fps}
          />
        </Sequence>
        <Sequence
          name="04 — Batas dukungan, izin, dan verifikasi"
          from={Math.round(timing.limits * fps)}
          durationInFrames={
            Math.round(timing.privacy * fps) - Math.round(timing.limits * fps)
          }
        >
          <LimitationsScene
            permissions={timing.permissions - timing.limits}
            sent={timing.sent - timing.limits}
          />
        </Sequence>
        <Sequence
          name="05 — Snapshot dan log dapat memuat data privat"
          from={Math.round(timing.privacy * fps)}
          durationInFrames={
            Math.round(timing.closing * fps) - Math.round(timing.privacy * fps)
          }
        >
          <PrivacyScene
            redact={timing.redact - timing.privacy}
            boundary={timing.boundary - timing.privacy}
          />
        </Sequence>
        <Sequence
          name="06 — Apa yang wajib dibatasi?"
          from={Math.round(timing.closing * fps)}
          durationInFrames={durationInFrames - Math.round(timing.closing * fps)}
        >
          <ClosingScene
            question={timing.question - Math.round(timing.closing * fps) / fps}
          />
        </Sequence>
      </div>
      <Sequence name="Overlay tetap — subtitle, karakter, watermark">
        <StableOverlays />
      </Sequence>
    </AbsoluteFill>
  );
};
