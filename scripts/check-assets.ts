import { sceneAssets, sightPins } from "../data/scene";

// The font is self-hosted under public/ (see data/scene.ts), so it's checked
// from disk rather than fetched like the remote scene images below.
const fontCheck = (async () => {
  const path = new URL("../public/fonts/OggText-Medium.woff2", import.meta.url);
  try {
    const bytes = new Uint8Array(await Bun.file(path).arrayBuffer());
    if (new TextDecoder().decode(bytes.slice(0, 4)) !== "wOF2") throw new Error("Not a WOFF2 font");
    return { name: "font", ok: true, bytes: bytes.length };
  } catch (error) {
    return { name: "font", ok: false, error: String(error) };
  }
})();

const remoteAssets: [string, string][] = [...Object.entries(sceneAssets), ...sightPins.map((url, index): [string, string] => [`pin${index + 1}`, url])];
const remoteResults = Promise.all(remoteAssets.map(async ([name, url]) => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes[0] !== 137 || bytes[1] !== 80 || bytes[2] !== 78 || bytes[3] !== 71) throw new Error("Not a PNG");
    const view = new DataView(bytes.buffer);
    return { name, ok: true, width: view.getUint32(16), height: view.getUint32(20), bytes: bytes.length };
  } catch (error) {
    return { name, ok: false, error: String(error) };
  }
}));

const results = [...(await remoteResults), await fontCheck];
console.table(results);
if (results.some((result) => !result.ok)) process.exitCode = 1;
