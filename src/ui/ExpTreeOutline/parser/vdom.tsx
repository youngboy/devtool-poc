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
    return {
      props: rest,
      children: val.$children$,
    };
  },
  customExpandable: (val) => val.$children$?.length > 0,
};

export default vdomParser;
