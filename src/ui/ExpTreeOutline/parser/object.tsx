import { PreviewValue } from "../PreviewNode";
import { ObjectType, Parser } from "../type";
import { getObjectClassName } from "../utils";

const MAX_PREVIEW_ITEM_END_INDEX = 10;

const objParser: Parser<ObjectType> = {
  test: (val): val is ObjectType => {
    return !!(val && typeof val === "object");
  },
  displayName: (props) => {
    let clsName = getObjectClassName(props.val);
    if (clsName === "Object") {
      clsName = "";
    }
    return (
      <span class={`${props.expanded ? "" : "text-fg-secondary"}`}>
        {clsName}
      </span>
    );
  },
  customExpandable: (val) => Object.keys(val).length > 0,
  expandedObj: (val) => val,
  collapsedPreview: (props) => {
    const iterateKeys: any[] = Object.keys(props.val || {}).slice(
      0,
      MAX_PREVIEW_ITEM_END_INDEX
    );
    return (
      <>
        {"{"}
        {iterateKeys.map((k, index) => (
          <>
            <span class="text-fg-secondary">{k}</span>
            {": "}
            <PreviewValue value={(props.val as any)[k]} />
            {index < iterateKeys.length - 1 && ", "}
          </>
        ))}
        {"}"}
      </>
    );
  },
};

export default objParser;
