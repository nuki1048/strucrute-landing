import fs from "fs";
import path from "path";

const statsPath = path.join(process.cwd(), "dist/stats.html");
const statsContent = fs.readFileSync(statsPath, "utf8");

// Extract chunk information from the stats
const chunkRegex = /chunk-([a-zA-Z0-9-]+)/g;
const chunks = [...statsContent.matchAll(chunkRegex)];

console.log("Chunk Analysis:");
chunks.forEach(([match, chunkName]) => {
  console.log(`- ${chunkName}`);
});

console.log("\nTotal chunks:", chunks.length);
