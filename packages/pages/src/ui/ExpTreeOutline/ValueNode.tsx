import PrimitiveNode from "./PrimitiveNode";
import { Parser, PossibleValueType, PrimitiveType } from "./type";

const ValueNode = (props: {
  parser?: Parser<PossibleValueType>;
  expanded: boolean;
  value: PossibleValueType;
}) => {
  return (
    <span>
      {props.parser?.displayName ? (
        <props.parser.displayName val={props.value} expanded={props.expanded} />
      ) : (
        <PrimitiveNode value={props.value as PrimitiveType} />
      )}
      {!props.expanded && props.parser?.collapsedPreview && (
        <>
          <span> </span>
          <props.parser.collapsedPreview val={props.value as any} />
        </>
      )}
    </span>
  );
};

export default ValueNode;
