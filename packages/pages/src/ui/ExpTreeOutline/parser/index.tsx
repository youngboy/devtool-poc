import { PossibleValueType } from "../type";
import arrayParser from "./array";
import objParser from "./object";
import qrlParser from "./qrl";
import linkParser from "./link";
import taskParser from "./task";
import vdomParser from "./vdom";

const parserList = [
  linkParser,
  taskParser,
  vdomParser,
  qrlParser,
  arrayParser,
  objParser,
];

export function tryGetParser(val: PossibleValueType) {
  return parserList.find((p) => p.test(val));
}
