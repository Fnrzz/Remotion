import manifest from "../../../../public/assets/documentary/manifest.json";
import { CUES } from "./sceneTimings";

export type DocumentaryAsset = {
  src: string;
  sourceUrl: string;
  creator: string;
  license: string;
  licenseUrl: string;
  description: string;
};

const photo = (id: string): DocumentaryAsset => {
  const record = manifest.find((asset) => asset.id === id);
  if (!record) throw new Error(`Documentary asset missing: ${id}`);
  const shortUrl = record.sourceShortUrl;
  return {
    ...record,
    src: `assets/documentary/${record.file}`,
    sourceUrl: shortUrl,
  };
};

export const DOCUMENTARY = {
  hook: photo("laptop-coding"),
  office: photo("google-deepmind-london-2017"),
  workspace: photo("hackathon-nyc"),
  debugging: photo("rust-code-screen"),
  security: photo("pair-programming"),
  inspection: photo("nersc-server-racks"),
  review: photo("wocintech-collaboration"),
  hardware: photo("computer-motherboard"),
  closing: photo("laptop-coding"),
} as const;

/** Use the exact same frame rounding as scene Sequences, including inner cuts. */
export const getDocumentaryCredits = (
  frame: number,
  fps: number,
): DocumentaryAsset[] => {
  if (frame < Math.round(CUES.reveal * fps)) return [];
  if (frame < Math.round(CUES.workflow * fps)) return [DOCUMENTARY.office];
  return [];
};
