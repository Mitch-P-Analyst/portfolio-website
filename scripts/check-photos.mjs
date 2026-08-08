// scripts/check-photos.mjs
//
// Compares public/images/photography/ against src/content/photography.json
// and reports any mismatch:
//   - image files with no matching JSON entry (untagged — won't appear on site)
//   - JSON entries with no matching image file (dangling — broken image on site)
//
// Usage:  node scripts/check-photos.mjs
// Optional: add "photos:check": "node scripts/check-photos.mjs" to package.json scripts

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PHOTO_DIR = path.join(ROOT, "public/images/photography");
const JSON_PATH = path.join(ROOT, "src/content/photography.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function loadJsonEntries() {
  const raw = fs.readFileSync(JSON_PATH, "utf8");
  const entries = JSON.parse(raw);
  // src looks like "/images/photography/filename.jpg" — strip to just the filename
  return new Map(entries.map((e) => [path.basename(e.src), e]));
}

function loadFolderFiles() {
  return fs
    .readdirSync(PHOTO_DIR)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));
}

function main() {
  const jsonEntries = loadJsonEntries();
  const folderFiles = new Set(loadFolderFiles());

  const untagged = [...folderFiles].filter((f) => !jsonEntries.has(f));
  const dangling = [...jsonEntries.keys()].filter((f) => !folderFiles.has(f));

  console.log(`\nChecked ${folderFiles.size} images against ${jsonEntries.size} JSON entries.\n`);

  if (untagged.length === 0 && dangling.length === 0) {
    console.log("✅ Everything is in sync.\n");
    return;
  }

  if (untagged.length > 0) {
    console.log(`⚠️  ${untagged.length} image(s) in the folder with no JSON entry (won't show on site):`);
    untagged.forEach((f) => {
      console.log(`   - ${f}`);
      console.log(
        `     Add to photography.json: { "src": "/images/photography/${f}", "season": "?", "location": "?", "type": "?" }`
      );
    });
    console.log("");
  }

  if (dangling.length > 0) {
    console.log(`⚠️  ${dangling.length} JSON entr${dangling.length === 1 ? "y" : "ies"} with no matching image file (broken image on site):`);
    dangling.forEach((f) => console.log(`   - ${f}`));
    console.log("");
  }

  process.exitCode = 1; // non-zero exit so this can be used as a pre-build check later if wanted
}

main();
