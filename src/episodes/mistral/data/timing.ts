// Measured from the supplied MP3; never synthesize, retime or trim the VO.
export const MISTRAL_AUDIO_SECONDS = 46.106063;
export const MISTRAL_CUES = {
  reveal: 4.78,
  weights: 10.18,
  choice: 16.34,
  limitations: 22.7,
  apiReminder: 35.82,
  closing: 39.18,
} as const;

export const MISTRAL_SOURCES = {
  announcement: "https://mistral.ai/news/mistral-large-4-oss/",
  repository: "https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B",
  license:
    "https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B/blob/main/LICENSE",
  server: "https://commons.wikimedia.org/?curid=17445617",
  programmer: "https://commons.wikimedia.org/?curid=61740057",
} as const;
