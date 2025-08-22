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
        gray2: { value: "#D9D9D9" },
        gray3: { value: "#2C2C2C" },
        gray4: { value: "#2C2C2C" },
        white2: { value: "#D8C7AB" },
        blue1: { value: "#1C2955" },
        purple1: { value: "#6860FF" },
        brown1: { value: "#B57434" },
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
