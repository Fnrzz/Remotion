import React from "react";
import { interpolate } from "remotion";
import { smooth } from "../config";

export const ChatInstructionBubble: React.FC<{ time: number }> = ({ time }) => (
  <div
    style={{
      position: "relative",
      width: 452,
      height: 94,
      opacity: interpolate(time, [1.8, 2.25, 7.2, 7.65], [0, 1, 1, 0], smooth),
      translate: interpolate(time, [1.8, 2.4], ["45px 0px", "0px 0px"], smooth),
    }}
  >
    <svg width="452" height="94" viewBox="0 0 452 94">
      <path d="M1 1H451V75H70L48 93V75H1Z" fill="#000000" />
      <text x="24" y="47" fill="#FFFFFF" fontSize="25" fontWeight="600">
        UBAH JADI MALAM
      </text>
      <circle cx="410" cy="38" r="23" fill="#708090" />
      <path
        d="M410 49V27m-8 8 8-8 8 8"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />
    </svg>
    <svg
      width="36"
      height="45"
      style={{
        position: "absolute",
        left: 397,
        top: 30,
        opacity: interpolate(time, [2.8, 3.1, 3.7, 4], [0, 1, 1, 0], smooth),
        translate: interpolate(
          time,
          [2.8, 3.3],
          ["55px 50px", "0px 0px"],
          smooth,
        ),
        scale: interpolate(time, [3.3, 3.45, 3.6], [1, 0.85, 1], smooth),
      }}
    >
      <path
        d="M2 2 29 25H17l-5 13Z"
        fill="#FAF9F6"
        stroke="#000000"
        strokeWidth="2"
      />
    </svg>
  </div>
);
