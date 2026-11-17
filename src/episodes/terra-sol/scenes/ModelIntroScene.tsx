import React from "react";
import { Img, staticFile } from "remotion";
import {
  ComparisonCard,
  Headline,
  Label,
  BODY_TOP,
} from "../components/EditorialPrimitives";
import { COLORS } from "../../../theme";

export const ModelIntroScene: React.FC = () => (
  <>
    <Headline>
      DUA MODEL.
      <br />
      <span style={{ color: COLORS.slate }}>SATU OPENAI.</span>
    </Headline>
    <Img
      name="Logo ChatGPT — OpenAI"
      alt="Logo ChatGPT / OpenAI"
      src={staticFile("assets/branding/chatgpt-openai-blossom.svg")}
      style={{
        position: "absolute",
        left: 495,
        top: 500,
        width: 150,
        height: 150,
        objectFit: "contain",
      }}
    />
    <ComparisonCard model="TERRA" left={60} />
    <ComparisonCard model="SOL" left={582} delay={4} />
    <Label
      style={{
        position: "absolute",
        top: BODY_TOP + 470,
        left: 72,
        fontSize: 33,
        fontWeight: 700,
      }}
    >
      DUA MODEL AI OPENAI
    </Label>
  </>
);
