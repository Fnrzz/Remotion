import React from "react";
import { AbsoluteFill } from "remotion";

type SceneShellProps = {
  index: string;
  label: string;
  meta: string;
  opacity: number;
  children: React.ReactNode;
};

export const SceneShell: React.FC<SceneShellProps> = ({
  opacity,
  children,
}) => {
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
