import { JSX } from "@builder.io/qwik/jsx-runtime";

export type PrimitiveType =
  | string
  | boolean
  | number
  | null
  | undefined
  | Function;

export type ArrayType = unknown[];
export type ObjectType = Record<string, unknown>;
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
