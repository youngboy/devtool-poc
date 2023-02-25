import { noSerialize } from "@builder.io/qwik";
import { tryGetParser } from "./parser";

import { PairValue, TargetType } from "./type";

function getPairItem(key: string, target: TargetType) {
  const value = target[key];
  const parser = tryGetParser(value);
  let canExpanded = false;

  if (parser?.customExpandable) {
    canExpanded = parser.customExpandable(value as any);
  } else if (parser?.expandedObj) {
    canExpanded = true;
  }

  return {
    parser,
    key,
    name: key,
    canExpanded,
  };
}

export default function usePairList(target: TargetType) {
  return Object.keys(target).reduce((acc, key) => {
    acc.push(getPairItem(key, target));
    return acc;
  }, [] as PairValue[]);
}
