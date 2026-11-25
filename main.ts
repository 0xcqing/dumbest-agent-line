import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const LINE =
  "My agent spent forty minutes grepping for a file it had renamed itself, then asked me if I had moved it.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

async function main(): Promise<void> {
  const charCount = [...LINE].length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`entry must be 1..200 characters, got ${charCount}`);
  }

  await mkdir(outputDir, { recursive: true });

  const entryPath = join(outputDir, "entry.txt");
  await writeFile(entryPath, `${LINE}\n`, { encoding: "utf8" });
  console.log(`wrote ${entryPath} (${charCount} chars)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
