import { genNamespace } from "./name";

const reqNs = genNamespace("request");

export const reqNsLogs = reqNs.useName("logs");

export function sendRequest() {
  reqNsLogs.postMessage({});
}
