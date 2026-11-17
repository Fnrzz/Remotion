import { Composition } from "remotion";
import { NewsTemplate } from "./NewsTemplate";

export const RemotionRoot = () => (
  <Composition
    id="ProfDepsTemplate"
    component={NewsTemplate}
    durationInFrames={360}
    fps={30}
    width={1080}
    height={1920}
  />
);
