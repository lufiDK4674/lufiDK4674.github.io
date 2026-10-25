// Optional asset regeneration. Uses the canvas runtime already supplied with pdf-parse.
import fs from "node:fs";
import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
const content = JSON.parse(
  fs.readFileSync(new URL("../src/data/professional.json", import.meta.url)),
);
GlobalFonts.registerFromPath("public/fonts/space-grotesk.ttf", "Space Grotesk");
const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#15191c";
ctx.fillRect(0, 0, 1200, 630);
ctx.fillStyle = "#f0f4f2";
ctx.font = '600 58px "Space Grotesk"';
ctx.fillText(content.site.name, 65, 180);
ctx.fillStyle = "#b9f883";
ctx.font = '400 29px "Space Grotesk"';
ctx.fillText(content.site.headline, 67, 240);
ctx.fillStyle = "#b4c3c7";
ctx.font = '400 23px "Space Grotesk"';
ctx.fillText("Agent automation · Document intelligence", 67, 325);
ctx.fillText("Computer vision · API engineering", 67, 365);
ctx.font = '400 20px "Space Grotesk"';
ctx.fillText(
  content.site.url.replace(/^https:\/\//, "").replace(/\/$/, ""),
  67,
  535,
);
const portrait = await loadImage("src/assets/profile.jpeg");
ctx.save();
ctx.beginPath();
ctx.roundRect(835, 140, 300, 300, 12);
ctx.clip();
ctx.drawImage(portrait, 835, 140, 300, 300);
ctx.restore();
ctx.font = '400 18px "Space Grotesk"';
ctx.fillText(content.experience[0].title, 835, 475);
ctx.fillText(content.experience[0].organization, 835, 505);
fs.writeFileSync("public/og-preview.png", canvas.toBuffer("image/png"));
console.log("Generated 1200 × 630 Signal Studio social preview.");

for (const size of [160, 360, 720]) {
  const image = createCanvas(size, size);
  image.getContext("2d").drawImage(portrait, 0, 0, size, size);
  fs.writeFileSync(
    `src/assets/profile-${size}.webp`,
    image.toBuffer("image/webp", 82),
  );
}
console.log(
  "Generated responsive portrait variants without changing the original JPEG.",
);
