import { ObjectType, PossibleValueType } from "./type";

export function isObjectNode(value: PossibleValueType): value is ObjectType {
  // exclude null object
  return !!(value && typeof value === "object");
}

export function getObjectClassName(value: unknown) {
  if (!value) {
    return "";
  }
  return value?.constructor?.name;
}
