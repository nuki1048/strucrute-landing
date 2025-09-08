const fs = require("fs");
const path = require("path");
const { optimize } = require("svgo");

const svgPath = path.join(__dirname, "../src/components/AnyScreen/Svg.tsx");

// Read the SVG file
const svgContent = fs.readFileSync(svgPath, "utf8");

// Extract SVG from the file (assuming it's wrapped in JSX)
const svgMatch = svgContent.match(/<svg[\s\S]*?<\/svg>/);
if (!svgMatch) {
  console.error("No SVG found in the file");
  process.exit(1);
}

const svgString = svgMatch[0];

// Optimize the SVG
const result = optimize(svgString, {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          removeDimensions: true,
          removeUselessStrokeAndFill: true,
          removeEmptyContainers: true,
          removeUnusedNS: true,
          removeEditorsNSData: true,
          removeMetadata: true,
          removeTitle: true,
          removeDesc: true,
          removeComments: true,
          removeUselessDefs: true,
          removeEmptyText: true,
          removeHiddenElems: true,
          removeEmptyAttrs: true,
          removeUnknownsAndDefaults: true,
          removeNonInheritableGroupAttrs: true,
          convertPathData: true,
          convertTransform: true,
          removeUnusedCSS: true,
          mergePaths: true,
          convertShapeToPath: true,
        },
      },
    },
  ],
});

// Replace the SVG in the original file
const optimizedContent = svgContent.replace(svgMatch[0], result.data);

// Write back to file
fs.writeFileSync(svgPath, optimizedContent);

console.log(
  `SVG optimized! Original size: ${svgString.length} bytes, Optimized size: ${result.data.length} bytes`
);
console.log(
  `Size reduction: ${(
    ((svgString.length - result.data.length) / svgString.length) *
    100
  ).toFixed(2)}%`
);
