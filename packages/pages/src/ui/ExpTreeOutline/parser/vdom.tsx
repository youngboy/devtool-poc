import { Parser } from "../type";
import { getObjectClassName } from "../utils";

const vdomParser: Parser<any> = {
  test: (val) => {
    return getObjectClassName(val) === "ProcessedJSXNodeImpl";
  },
  displayName: (props) => (
    <>
      <span class="text-token-tag">{props.val.$type$}</span>
      <span class="text-token-attribute">
        {props.val.$props$?.class &&
          `.${props.val.$props$.class.split(" ").join(".")}`}
      </span>
    </>
  ),
  expandedObj: (val) => {
    const child = val.$children$;
    if (child.length === 1 && child[0].$type$ === "#text") {
      return {
        text: child[0].$text$,
      };
    }
    const { class: clz, ...rest } = val.$props$ || {};
    const result: Record<string, any> = {
      children: val.$children$,
    };
    if (clz) {
      result.className = clz;
    }
    if (Object.keys(result).length !== 0) {
      result.props = rest;
    }
    return result;
  },
  customExpandable: (val) => val.$children$?.length > 0,
};

export default vdomParser;
