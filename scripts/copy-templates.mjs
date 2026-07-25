import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { copy } from "fs-extra";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, "..", "src", "templates");
const dest = join(__dirname, "..", "dist", "templates");

await copy(src, dest);
console.log("✔ templates copied to dist/templates");
