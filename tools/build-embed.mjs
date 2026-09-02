import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const css = await readFile(path.join(root, "src/styles.css"), "utf8");
const data = await readFile(path.join(root, "src/map-data.js"), "utf8");
const js = await readFile(path.join(root, "src/detour-map.js"), "utf8");
const image = await readFile(path.join(root, "assets/detour_map.png"));
const imageData = `data:image/png;base64,${image.toString("base64")}`;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Detour Festival Map</title>
    <style>
${css}
    </style>
  </head>
  <body>
    <main class="detour-page">
      <section
        class="detour-map"
        data-detour-map
        data-map-src="${imageData}"
        aria-label="Interactive Detour festival map"
      ></section>
    </main>
    <script>
${data}
${js}
    </script>
  </body>
</html>
`;

await mkdir(path.join(root, "dist"), { recursive: true });
await writeFile(path.join(root, "dist/canva-embed.html"), html);

console.log("Built dist/canva-embed.html");
