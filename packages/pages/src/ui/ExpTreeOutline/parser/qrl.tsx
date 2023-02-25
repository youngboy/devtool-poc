import { Qrl } from "~/utils/type";
import { Parser } from "../type";

function getQrlAttrs(qrl?: Qrl) {
  if (!qrl?.dev) {
    return {};
  }
  return {
    name: qrl.dev.displayName,
    captureRef: qrl.$captureRef$,
    filepath: `vscode://file${qrl.dev.file}:${qrl.dev.lo}:${qrl.dev.hi}`,
  };
}

const qrlParser: Parser<Qrl> = {
  test: (val): val is Qrl => {
    return !!val && val.hasOwnProperty("dev") && val?.dev;
  },
  displayName: (props) => (
    <span class={`${props.expanded ? "" : "text-fg-secondary"}`}>$Qrl</span>
  ),
  expandedObj: getQrlAttrs,
  collapsedPreview: (props) => <>{`${props.val.dev.displayName}`}</>,
};

export default qrlParser;
