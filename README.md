# Detour Interactive Map

Standalone interactive map starter for a Canva website page.

## Files

- `index.html` is the local development page.
- `assets/detour_map.png` is the source map image.
- `src/map-data.js` defines the clickable areas and modal copy.
- `src/detour-map.js` renders the hotspots and dialog behavior.
- `src/styles.css` contains all page and hotspot styling.
- `dist/canva-embed.html` is the single-file build meant for embedding or hosting.

## Edit Map Areas

Clickable areas are configured in `src/map-data.js`. Each area uses percentage-based
coordinates so it scales with the image:

```js
{
  id: "main-stage",
  title: "Main Stage",
  description: "Live performances anchor this corner of the festival.",
  x: 21,
  y: 34,
  width: 10,
  height: 9
}
```

Adjust `x`, `y`, and `width` to move or resize a hotspot. Hotspots render as
true circles, so `width` controls the circle diameter.

## Build A Canva-Friendly File

```bash
npm run build
```

That writes `dist/canva-embed.html`, with the CSS, JavaScript, and map image bundled
into one HTML file.

For Canva, the most reliable workflow is to host `dist/canva-embed.html` somewhere
public, then add it to the Canva page as an embed link or iframe:

```html
<iframe
  src="https://your-host.example/detour-map/canva-embed.html"
  title="Detour Festival Map"
  style="width:100%;height:900px;border:0;"
></iframe>
```

## Local Preview

Open `index.html` in a browser, or run any static file server from this folder.
The preview page uses plain scripts so it can load from `file://` in stricter
browsers.
