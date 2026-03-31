// Why: Server component — reads ASCII art file at build time, zero client JS
// The pre block is aria-hidden so it doesn't pollute screen readers.
// This renders the FULL eye shape. The star/iris is rendered separately
// by AsciiEyeIris so it can be animated independently (cursor tracking).
import fs from "fs";
import path from "path";

function getAsciiArt(): string {
  // Why: Read at build time — no runtime cost, no client bundle impact
  // File was moved to public/ascii-art.txt (no longer in images/ subfolder)
  const filePath = path.join(process.cwd(), "public", "ascii-art.txt");
  const raw = fs.readFileSync(filePath, "utf-8");
  // Why: Filter empty trailing lines but preserve blank padding rows
  const lines = raw.split("\n");

  // Why: The new art is already sized correctly (~55 rows × 100 cols)
  // and already inverted (dots = eye body, space = background/star).
  // No cropping or character remapping needed.
  const TARGET_COLS = 100;
  const padded = lines.map((line) => line.padEnd(TARGET_COLS, " ").substring(0, TARGET_COLS));

  return padded.join("\n");
}

export default function AsciiEyeBody(): React.JSX.Element {
  const art = getAsciiArt();

  return (
    <pre
      aria-hidden="true"
      className="
        font-mono text-[18px] leading-[18px]
        text-ghost opacity-65
        pointer-events-none select-none
        whitespace-pre overflow-hidden
        w-[1800px] h-[990px]
      "
    >
      {art}
    </pre>
  );
}
