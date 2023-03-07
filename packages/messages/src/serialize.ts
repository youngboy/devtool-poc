export type Replacer = {
  test: (k: string, value: unknown) => boolean;
  trans: (value: any) => unknown;
};

export const internalKeys = ["$typeof$", "$typeName$"];

export function serializeFactory(customReplacers: Replacer[]) {
  // prevent circular refs
  const memoObj = new Map<unknown, unknown>();

  function iterateObj(obj: unknown, initVal: Record<string, unknown>) {
    if (memoObj.has(obj)) {
      return memoObj.get(obj);
    }
    memoObj.set(obj, initVal);

    Object.keys(obj as object).forEach((key) => {
      let value = (obj as any)[key];
      customReplacers.forEach((repl) => {
        if (repl.test(key, value)) {
          value = repl.trans(value);
        }
      });
      // @ts-ignore
      initVal[key] = serialize(value);
    });
    return initVal;
  }

  function serialize(item: unknown): any {
    if (typeof item === "function") {
      return iterateObj(item, {
        $typeof$: "object",
        $typeName$: item.name,
      });
    }
    if (Array.isArray(item)) {
      return item.map(serialize);
    }
    if (item && typeof item === "object") {
      return iterateObj(item, {
        $typeof$: "object",
        $typeName$: item.constructor?.name,
      });
    }
    return item;
  }
  return serialize;
}
