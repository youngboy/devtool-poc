import PrimitiveNode from "./PrimitiveNode";
import { getObjectClassName, isObjectNode } from "./utils";

export const PreviewValue = (props: { value: any }) => {
  const objClsName = getObjectClassName(props.value);
  return (
    <>
      {typeof props.value === "function" ? (
        "ƒ"
      ) : Array.isArray(props.value) ? (
        `${objClsName || "Array"}(${props.value.length})`
      ) : isObjectNode(props.value) ? (
        objClsName === "Object" ? (
          `{...}`
        ) : (
          objClsName
        )
      ) : (
        <PrimitiveNode value={props.value} />
      )}
    </>
  );
};
