import { component$, useSignal } from "@builder.io/qwik";
import { HTMLElementEvent } from "~/utils/type";

// C = (F - 32) * (5/9)
export function convertToC(f: string) {
  const fNum = Number(f);
  if (f === "" || isNaN(fNum)) {
    return "";
  }
  return Number((fNum - 32) * (5 / 9)).toFixed(0);
}

// F = C * (9/5) + 32
export function convertToF(c: string) {
  const cNum = Number(c);
  if (c === "" || isNaN(cNum)) {
    return "";
  }
  return Number(cNum * (9 / 5) + 32).toFixed(0);
}

export default component$(() => {
  const celsius = useSignal<string | undefined>(undefined);
  const fahrenheit = useSignal<string | undefined>(undefined);
  const errors = useSignal<{
    celsius?: boolean;
    fahrenheit?: boolean;
  }>();

  return (
    <div class="flex items-center gap-2 whitespace-nowrap p-2 text-base">
      <input
        value={celsius.value}
        class={`text-input ${errors.value?.celsius ? "error" : ""}`}
        onInput$={(e: HTMLElementEvent<HTMLInputElement>) => {
          celsius.value = e.target.value;
          const fValue = convertToF(celsius.value);
          if (fValue) {
            errors.value = undefined;
            fahrenheit.value = fValue;
          } else {
            errors.value = {
              celsius: true,
            };
          }
        }}
        type="number"
      />
      <span>Celsius = </span>
      <input
        class={`text-input ${errors.value?.fahrenheit ? "error" : ""}`}
        value={fahrenheit.value}
        type="number"
        onInput$={(e: HTMLElementEvent<HTMLInputElement>) => {
          fahrenheit.value = e.target.value;
          const fValue = convertToC(fahrenheit.value);
          if (fValue) {
            errors.value = undefined;
            celsius.value = fValue;
          } else {
            errors.value = {
              fahrenheit: true,
            };
          }
        }}
      />
      <span>Fahrenheit</span>
    </div>
  );
});
