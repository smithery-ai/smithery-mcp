import { pathToFileURL } from "url";

import { join } from "path";

import { platform } from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const isWindows = platform() === "win32";
function createFileURL(filePath: string): URL {
  if (isWindows) {
    const normalizedPath = filePath.replace(/\\/g, "/");
    if (normalizedPath.startsWith("/")) {
      return new URL(`file://${normalizedPath}`);
    } else {
      return new URL(`file:///${normalizedPath}`);
    }
  } else {
    return pathToFileURL(filePath);
  }
}
export async function runSetup() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    console.log(__dirname);
    const setupScriptPath = join(__dirname, "install.js");
    const setupScriptUrl = createFileURL(setupScriptPath);

    const { default: setupModule } = await import(setupScriptUrl.href);
    if (typeof setupModule === "function") {
      await setupModule();
    }
  } catch (error) {
    console.error("Error running setup:", error);
    process.exit(1);
  }
}
