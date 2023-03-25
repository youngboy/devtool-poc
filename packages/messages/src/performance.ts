import { genNamespace } from "./name";

const perfNs = genNamespace("performance");

export const perfNsLogs = perfNs.useName("logs");

// @ts-ignore
export function handleRenderStats(stats, staticCtx) {
  console.log(stats, staticCtx);
  perfNsLogs.postMessage({});
}
