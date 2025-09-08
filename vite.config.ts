// vite.config.ts
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import importToCDN from "vite-plugin-cdn-import";

const useCDN = process.env.NODE_ENV === "production";

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

    // If using CDN, these will be external and won't appear in chunks anyway
    if (!useCDN) {
      if (pkg === "three" || pkg?.startsWith("three")) return "three-core";
      if (
        pkg === "@react-three/fiber" ||
        pkg === "@react-three/drei" ||
        pkg === "@react-three/postprocessing"
      )
        return "react-three";
      if (pkg === "gsap") return "gsap";
    }

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

    useCDN &&
      importToCDN({
        prodUrl: "https://cdn.jsdelivr.net/npm/{name}@{version}/{path}",
        modules: [
          {
            name: "three",
            var: "THREE",
            path: "build/three.min.js",
          },
        ],
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
      // Mark CDN libs as external so Rollup doesn’t bundle them
      external: useCDN ? ["three", "gsap"] : [],
      output: {
        manualChunks,
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        // When external, Rollup may need globals map for legacy formats;
        // for ESM this is typically ignored, but safe to provide:
        globals: {
          three: "THREE",
          gsap: "gsap",
        },
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
    // keep three/gsap in dev prebundle for fast HMR
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
