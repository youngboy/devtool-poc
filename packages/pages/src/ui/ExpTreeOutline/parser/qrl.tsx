import { Parser, QrlType } from "../type";
import { getObjectClassName } from "../utils";

/**
 * Get the attributes of a QRL object
 * FIXME: it will break in production mode cause the qrl object is minified
 * @param qrl
 * @returns
 */
function getQrlAttrs(qrl: QrlType) {
  const attrs = {
    name: qrl.dev?.displayName || qrl.$symbol$,
    chunk: qrl.$chunk$,
    captureRef: qrl.$captureRef$,
    filepath: "",
  };
  if (qrl.dev) {
    attrs.filepath = `vscode://file${qrl.dev.file}:${qrl.dev.lo}:${qrl.dev.hi}`;
  }
  return attrs;
}

const qrlParser: Parser<QrlType> = {
  test: (val): val is QrlType => {
    return getObjectClassName(val) === "invokeQRL";
  },
  displayName: (props) => (
    <span class={`${props.expanded ? "" : "text-fg-secondary"}`}>
      {getObjectClassName(props.val)}
    </span>
  ),
  expandedObj: getQrlAttrs,
  collapsedPreview: (props) => <>{`${props.val.dev?.displayName || ""}`}</>,
};

export default qrlParser;
