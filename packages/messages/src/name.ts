const prefix = "qwik-dev";

export const MSG_NAME = {
  RENDER_STATS: `${prefix}-render-stats`,
  ELEMENT_INFO: `${prefix}-element-info`,
  REQUEST: `${prefix}-network`,
};

type MsgEvtData = {
  name: string;
  message: unknown;
};

function isMessageType(val: unknown): val is MsgEvtData {
  return typeof val === "object" && !!val && "name" in val && "message" in val;
}

export function genNamespace(ns: string) {
  return {
    useName(label: string) {
      const name = `${prefix}:${ns}:${label}`;
      return {
        postMessage: (message: unknown) =>
          window.postMessage({
            name,
            message,
          }),
        handleMessage: (fn: (data: unknown) => void) => {
          const controller = new AbortController();
          window.addEventListener(
            "message",
            (ev: { data: unknown }) => {
              if (isMessageType(ev.data)) {
                fn(ev.data.message);
              }
            },
            {
              signal: controller.signal,
            }
          );
          return () => {
            controller.abort();
          };
        },
      };
    },
  };
}
