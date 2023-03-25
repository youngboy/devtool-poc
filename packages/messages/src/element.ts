import { genNamespace } from "./name";
import { Replacer, serializeFactory } from "./serialize";
import { QcElement } from "./type";

const elNs = genNamespace("element");

export const elNsAnchorUpdate = elNs.useName("anchorUpdate");

/**
 * This replacer is used to replace qwik component
 * for limit what is sent to the devtools.
 */
const parentCmpReplacer: Replacer = {
  test: (key, value) => !!value && key === "$parent$",
  trans: (value) => {
    return {
      $typeName$: "component$",
      componentQrl: value.$componentQrl$,
      props: value.$props$,
      listeners: value.li,
      watchers: value.$watches$,
      styles: value.$appendStyles$,
      vdom: value.$vdom$,
      $parent$: value.$parent$,
    };
  },
};

let anchor: {
  el?: QcElement;
  expandedKeys: string[];
} = {
  el: undefined,
  expandedKeys: [],
};

export function setAnchorElement(el: QcElement) {
  anchor = {
    el,
    expandedKeys: [],
  };
  onAnchorElementUpdate();
}

export function onAnchorElementUpdate() {
  // when element no longer mounted
  // TODO: maybe loop to find its parent then send update instead.
  if (!anchor.el || !anchor.el.isConnected) {
    elNsAnchorUpdate.postMessage({});
    return;
  }
  const replacer = serializeFactory([parentCmpReplacer]);
  // const now = Date.now();
  const data = replacer(anchor.el._qc_);
  // console.debug("serialize cost", Date.now() - now, "ms");
  elNsAnchorUpdate.postMessage(data);
}
