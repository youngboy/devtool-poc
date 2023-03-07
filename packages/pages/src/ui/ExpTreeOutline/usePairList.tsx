import { internalKeys } from "@yb/devtools-messages/serialize";
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
    if (internalKeys.includes(key)) {
      return acc;
    }
    acc.push(getPairItem(key, target));
    return acc;
  }, [] as PairValue[]);
}
