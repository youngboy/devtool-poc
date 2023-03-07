import { JSX } from "@builder.io/qwik/jsx-runtime";
import { Qrl } from "~/utils/type";

type ObjectMeta = {
  $typeof$: string;
  $typeName$: string;
};
export type PrimitiveType =
  | string
  | boolean
  | number
  | null
  | undefined
  | Function;

export type ArrayType = unknown[];
export type ObjectType = ObjectMeta & Record<string, unknown>;
export type QrlType = ObjectMeta & Qrl;
export type PossibleValueType = PrimitiveType | ArrayType | ObjectType;

export type TargetType = Record<string, PossibleValueType>;
export type PairValue = {
  name: string;
  key: string;
  parser?: Parser<any>;
  canExpanded: boolean;
};

export type Parser<T> = {
  test: (val: any) => boolean;
  displayName: (props: { val: T; expanded: boolean }) => JSX.Element;
  customExpandable?: (val: T) => boolean;
  expandedObj?: (val: T) => any;
  collapsedPreview?: (props: { val: T }) => JSX.Element;
};
