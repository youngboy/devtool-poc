import { internalKeys } from "@yb/devtools-messages/serialize";
import { PreviewValue } from "../PreviewNode";
import { ObjectType, Parser } from "../type";
import { getObjectClassName } from "../utils";

const MAX_PREVIEW_ITEM_END_INDEX = 10;

const objParser: Parser<ObjectType> = {
  test: (val): val is ObjectType => {
    return val?.$typeof$ === "object";
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
  customExpandable: (val) => Object.keys(val).length > internalKeys.length,
  expandedObj: (val) => val,
  // This code is used to create the preview of an object in the sidebar when it is not expand,
  // by displaying an object's key-value pair in the table view.
  collapsedPreview: (props) => {
    // We only display the first MAX_PREVIEW_ITEM_END_INDEX items in the object.
    // We filter out internal keys like $typeof$ and $typename$ for serialize usage.
    const iterateKeys: any[] =
      props.val?.$typeName$ !== "Object"
        ? []
        : Object.keys(props.val || {})
            .filter((i) => !internalKeys.includes(i))
            .slice(0, MAX_PREVIEW_ITEM_END_INDEX);
    return (
      <>
        {props.val?.$typeName$ !== "Object" ? null : (
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
        )}
      </>
    );
  },
};

export default objParser;
