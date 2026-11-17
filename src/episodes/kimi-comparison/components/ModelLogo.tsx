import React from "react";
import { Img, staticFile } from "remotion";

// Brand marks identify model families, not invented version-specific emblems.
// Provenance: public/assets/branding/kimi-comparison-LOGOS.md.
const logos = [
  { file: "kimi-logo.svg", alt: "Logo Kimi", id: "kimi" },
  { file: "claude-logo.svg", alt: "Logo Claude", id: "opus" },
  { file: "chatgpt-openai-blossom.svg", alt: "Logo OpenAI", id: "astra" },
] as const;

export const ModelLogo: React.FC<{ index: 0 | 1 | 2; size?: number }> = ({
  index,
  size = 84,
}) => (
  <Img
    name="Model brand logo"
    data-model-logo={logos[index].id}
    alt={logos[index].alt}
    src={staticFile(`assets/branding/${logos[index].file}`)}
    style={{
      display: "block",
      width: size,
      height: size,
      objectFit: "contain",
    }}
  />
);
