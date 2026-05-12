import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/brand/logo.png";

const meta = await sharp(SRC).metadata();
// Logo is ~1089x490 with the circular skater illustration on the left.
// Crop a tight square around just the circle, no wordmark.
const cropSize = Math.round(meta.height * 0.85);
const left = Math.round(meta.height * 0.05);
const top = Math.round((meta.height - cropSize) / 2);

await mkdir("app", { recursive: true });

await sharp(SRC)
  .extract({ left, top, width: cropSize, height: cropSize })
  .resize(32, 32)
  .png()
  .toFile("app/icon.png");

await sharp(SRC)
  .extract({ left, top, width: cropSize, height: cropSize })
  .resize(180, 180)
  .png()
  .toFile("app/apple-icon.png");

console.log("icons generated");
