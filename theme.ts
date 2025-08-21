import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#4843AE" },
        secondary: { value: "#D9D9D9" },
        background: { value: "#09090A" },
        text: { value: "#FFFFFF" },
        black1: { value: "#121212" },
        gray1: { value: "#666666" },
      },
      fonts: {
        body: {
          value: "Inter, Arial, 'Helvetica Neue', Helvetica, sans-serif",
        },
        heading: {
          value: "Inter, Arial, 'Helvetica Neue', Helvetica, sans-serif",
        },
        mono: {
          value:
            "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
        },
        secondary: {
          value: "Arial, 'Helvetica Neue', Helvetica, Inter, sans-serif",
        },
        alternative: {
          value: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
        },
        ppMori: { value: "'PP Mori', Inter, Arial, sans-serif" },
        elegant: { value: "'PP Mori', Arial, sans-serif" },
      },
      sizes: {
        "9xl": { value: "1448px" },
      },
      breakpoints: {
        "2xl": { value: "1400px" },
        "3xl": { value: "1600px" }, // You can add more if needed
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
