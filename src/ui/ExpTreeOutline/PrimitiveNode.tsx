import { PrimitiveType } from "./type";

const PrimitiveNode = (props: { value: PrimitiveType }) => {
  let displayText = `${props.value}`;
  let cls = "";
  switch (typeof props.value) {
    case "string":
      cls = "text-syntax-1";
      displayText = `"${displayText}"`;
      break;
    case "number":
      cls = "text-syntax-3";
      break;
    case "boolean":
      cls = "text-syntax-3";
      break;
    case "function":
      break;
    default:
      cls = "text-fg-disable";
      break;
  }
  return (
    <span class={cls} title={`${props.value}`}>
      {displayText}
    </span>
  );
};

export default PrimitiveNode;
