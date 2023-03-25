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

/**
 * This function generates a namespace object that can be used to send and receive messages
 * @param ns The namespace name
 * @returns A namespace object
 */
export function genNamespace(ns: string) {
  return {
    /**
     * This function returns a message object that can be used to send messages
     * @param label The label of the message, event name will be `qwik-dev:{namespace}:{label}`
     * @returns A message object
     */
    useName(label: string) {
      const name = `${prefix}:${ns}:${label}`;
      return {
        /**
         * This function sends a message
         * @param message The message to send
         */
        postMessage: (message: unknown) =>
          window.postMessage({
            name,
            message,
          }),
        /**
         * This function registers a message handler
         * @param fn The message handler
         * @returns A function that can be called to unregister the message handler
         */
        handleMessage: (fn: (data: unknown) => void) => {
          const controller = new AbortController();
          window.addEventListener(
            "message",
            (ev: { data: unknown }) => {
              if (isMessageType(ev.data) && ev.data.name === name) {
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
