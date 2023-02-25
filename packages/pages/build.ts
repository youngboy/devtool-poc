import path from "path";
import { fileURLToPath } from "url";
import { build } from "vite";
import { watch } from "chokidar";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function buildDevtools() {
  await build({
    configFile: path.join(__dirname, "crx-vite.config.ts"),
  });
  await build({
    configFile: path.join(__dirname, "vite.config.ts"),
  });
  await build({
    configFile: path.join(__dirname, "adapters/static/vite.config.ts"),
    ssr: {},
  });
}

const debounce = (fn: () => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      fn();
    }, 100);
  };
};
(async () => {
  await buildDevtools();
  watch("./src", {}).on("change", debounce(buildDevtools));
})();
