import { noSerialize } from "@builder.io/qwik";
import { QcElement } from "~/utils/type";

export const getQcContext = (el?: QcElement) => {
  // const el = document.querySelector("[role='tab']") as QcElement;
  if (!el || !el._qc_) {
    return {};
  }
  const hostContext = el._qc_?.$parent$;
  return {
    host: {
      details:
        hostContext &&
        noSerialize({
          component: hostContext?.$componentQrl$,
          props: hostContext?.$props$,
          listeners: hostContext?.li,
          watchers: hostContext?.$watches$,
          styles: hostContext?.$appendStyles$,
          vdom: hostContext?.$vdom$,
          parent: hostContext?.$parent$
            ? {
                component: hostContext?.$parent$?.$componentQrl$,
                props: hostContext?.$parent$?.$props$,
                listeners: hostContext?.$parent$?.li,
                watchers: hostContext?.$parent$?.$watches$,
                styles: hostContext?.$parent$?.$appendStyles$,
              }
            : null,
        }),
    },
    context: {
      props: el._qc_?.$props$,
      listeners: el._qc_?.li,
    },
  };
};
