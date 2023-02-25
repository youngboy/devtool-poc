import { component$, noSerialize, Signal, useSignal } from "@builder.io/qwik";
import ValueNode from "./ValueNode";
import { PairValue, TargetType } from "./type";
import usePairList from "./usePairList";

export interface ExpTreeOutlineProps {
  class?: string;
  target: TargetType;
}

export const ExpTreeOutlineRow = (
  props: {
    expandedKeys: Signal<string[]>;
    target: TargetType;
    itemKey: string;
  } & PairValue
) => {
  const { expandedKeys } = props;
  const expanded = props.canExpanded
    ? expandedKeys.value.includes(props.itemKey)
    : false;
  return (
    <>
      <li
        class={`${props.canExpanded ? "parent" : ""} ${
          expanded ? "expanded" : ""
        }`}
        onClick$={() => {
          if (!props.canExpanded) {
            return;
          }
          if (expanded) {
            expandedKeys.value = expandedKeys.value.filter(
              (i) => i !== props.itemKey
            );
          } else {
            expandedKeys.value = expandedKeys.value.concat(props.itemKey);
          }
        }}
      >
        <span class="flex overflow-hidden whitespace-nowrap leading-4">
          <span class="flex-shrink-0 text-syntax-2">{props.name}</span>
          <span class="flex-shrink-0 whitespace-pre">: </span>
          <ValueNode
            parser={props.parser}
            expanded={expanded}
            value={props.target[props.itemKey]}
          />
        </span>
      </li>

      {expanded && props.parser?.expandedObj ? (
        <ExpTreeOutline
          target={noSerialize(
            props.parser?.expandedObj(props.target[props.itemKey])
          )}
        />
      ) : null}
    </>
  );
};

export const ExpTreeOutline = component$<ExpTreeOutlineProps>((props) => {
  const expandedKeys = useSignal<string[]>([]);
  const listPairs = usePairList(props.target);

  return (
    <ol class={`tree-outline ${props.class || ""}`}>
      {listPairs.map((item) => {
        // FIXME: noticed that I'm set `key` and `itemKey` there...
        //   (qwik-jsx) `key` is not accessible in child's props
        return (
          <ExpTreeOutlineRow
            key={item.key}
            itemKey={item.key}
            name={item.name}
            canExpanded={item.canExpanded}
            parser={noSerialize(item.parser)}
            target={props.target}
            expandedKeys={expandedKeys}
          />
        );
      })}
    </ol>
  );
});

export default ExpTreeOutline;
