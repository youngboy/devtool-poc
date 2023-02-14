import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const count = useSignal(0);
  return (
    <div class="flex w-[200px] items-center p-2 text-base">
      <div class="flex-1 text-center">{count.value}</div>
      <button
        class="text-button flex-1"
        onClick$={() => {
          count.value += 1;
        }}
      >
        Count
      </button>
    </div>
  );
});
