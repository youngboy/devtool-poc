import { Parser } from "../type";
import { getObjectClassName } from "../utils";
import qrlParser from "./qrl";

const taskParser: Parser<any> = {
  test: (val) => {
    if (qrlParser.test(val?.$qrl$)) {
      return getObjectClassName(val) === "Task";
    }
    return false;
  },
  displayName: (props) => (
    <span class={`${props.expanded ? "" : "text-fg-secondary"}`}>
      {getObjectClassName(props.val)}
    </span>
  ),
  expandedObj: (val) => qrlParser.expandedObj?.(val.$qrl$),
  collapsedPreview: (props) => (
    <>{`${props.val.$qrl$?.dev?.displayName || ""}`}</>
  ),
};

export default taskParser;
