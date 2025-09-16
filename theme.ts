import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#4843AE" },
        secondary: { value: "#D9D9D9" },
        purple2: { value: "#5751d9" },
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
        white1: { value: "#D9D9D9" },
        white: { value: "#FFFFFF" },
        pink1: { value: "#BD5CFF" },
      },
      fonts: {
        body: {
          value:
            "Raleway,system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
        heading: {
          value:
            "Raleway,system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
        mono: {
          value:
            "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
        },

        ppMori: { value: "'PP Mori', Raleway, sans-serif" },
        elegant: { value: "'PP Mori', sans-serif" },
        notoSerif: { value: "'Noto Serif', serif" },
        raleway: {
          value:
            "Raleway,system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
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
