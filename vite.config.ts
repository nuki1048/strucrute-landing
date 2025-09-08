// vite.config.ts
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

function manualChunks(id: string) {
  if (id.includes("node_modules")) {
    const m = id.toString().split("node_modules/")[1];
    const pkg = m?.split("/")[0].startsWith("@")
      ? m.split("/").slice(0, 2).join("/")
      : m?.split("/")[0];

    // Stable vendor buckets
    if (/^(react|react-dom)$/.test(pkg ?? "")) return "react-vendor";
    if (
      pkg === "@chakra-ui/react" ||
      pkg?.startsWith("@chakra-ui/") ||
      pkg === "@emotion/react" ||
      pkg === "@emotion/styled"
    )
      return "chakra-emotion";
    if (pkg === "framer-motion") return "framer-motion";

    if (pkg === "three" || pkg?.startsWith("three")) return "three-core";
    if (
      pkg === "@react-three/fiber" ||
      pkg === "@react-three/drei" ||
      pkg === "@react-three/postprocessing"
    )
      return "react-three";
    if (pkg === "gsap") return "gsap";

    if (pkg === "lenis") return "lenis";
    return "vendor";
  }

  return undefined;
}

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // ⬇️ only *.svg?react will become React components
      include: "**/*.svg?react",
      svgrOptions: {
        svgo: true,
        svgoConfig: {
          multipass: true,
          floatPrecision: 2,
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                  cleanupIds: { remove: true, minify: true },
                  convertPathData: { floatPrecision: 2 },
                },
              },
            },
            "convertStyleToAttrs",
            { name: "convertTransform" },
            { name: "mergePaths" },
            {
              name: "removeUnknownsAndDefaults",
              params: { keepDataAttrs: true },
            },
          ],
        },
      },
    }),

    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  build: {
    target: "es2020",
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    sourcemap: false,
    minify: "esbuild",
    reportCompressedSize: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks,
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "@chakra-ui/react"],
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
