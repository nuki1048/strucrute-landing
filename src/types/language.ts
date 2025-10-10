export const LanguageCode = {
  EN: "en-US",
  UK: "uk-UA",
} as const;

export type LanguageCode = (typeof LanguageCode)[keyof typeof LanguageCode];
