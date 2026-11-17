import React from "react";
import { FONT_FAMILY } from "../fonts";
import { COLORS } from "../theme";

// Plain, unanimated attribution. No background, border, or badge decoration.
export const ImageSourceText: React.FC<{
  sourceUrl: string;
  inline?: boolean;
  style?: React.CSSProperties;
}> = ({ sourceUrl, inline = false, style }) => {
  const url = new URL(sourceUrl);

  return (
    <div
      data-source-url={sourceUrl}
      style={{
        alignItems: "flex-start",
        boxSizing: "border-box",
        color: COLORS.black,
        display: inline ? "block" : "flex",
        flexDirection: "column",
        fontFamily: FONT_FAMILY,
        fontSize: 24,
        fontWeight: 700,
        gap: 4,
        letterSpacing: 0,
        lineHeight: 1.25,
        maxWidth: "100%",
        pointerEvents: "none",
        position: "absolute",
        ...style,
      }}
    >
      <strong
        style={{
          color: COLORS.gray,
          fontSize: inline ? "inherit" : "0.6667em",
        }}
      >
        Sumber foto:
      </strong>
      {inline ? " " : null}
      <span
        style={{
          fontWeight: inline ? 500 : 700,
          minWidth: 0,
          overflowWrap: "anywhere",
        }}
      >
        {url.host}
        {url.pathname.replace(/\/$/, "")}
        {url.search}
        {url.hash}
      </span>
    </div>
  );
};
