import { PreviewValue } from "../PreviewNode";
import { ArrayType, Parser } from "../type";
import { getObjectClassName } from "../utils";

const MAX_PREVIEW_ITEM_END_INDEX = 10;

const arrayParser: Parser<ArrayType> = {
  test: (val): val is ArrayType => {
    return Array.isArray(val);
  },
  displayName: (props) => {
    let clsName = getObjectClassName(props.val);
    clsName = `${clsName}(${props.val.length})`;
    return (
      <span class={`${props.expanded ? "" : "text-fg-secondary"}`}>
        {clsName}
      </span>
    );
  },
  customExpandable: (val) => {
    return val.length > 0;
  },
  expandedObj: (val) => val,
  collapsedPreview: (props) => {
    return (
      <>
        {props.val.length > 0 ? (
          <>
            {"["}
            {props.val.slice(0, MAX_PREVIEW_ITEM_END_INDEX).map((i, index) => (
              <span key={index}>
                <PreviewValue value={i} />
                {index < (props.val.length as number) - 1 && <span>, </span>}
              </span>
            ))}
            {"]"}
          </>
        ) : null}
      </>
    );
  },
};

export default arrayParser;
