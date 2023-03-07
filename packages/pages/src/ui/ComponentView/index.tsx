import { component$, Signal } from "@builder.io/qwik";
import ExpTreeOutline from "../ExpTreeOutline";

interface ClassProps {
  class?: string;
  qContext?: Signal<any>;
}

export default component$((props: ClassProps) => {
  return (
    <div class={`${props.class || ""}`}>
      <div class="flex flex-col">
        {props.qContext?.value?.context ? (
          <ExpTreeOutline
            target={props.qContext.value.context}
            class="hairline-b py-[2px] px-1 font-mono text-[11px]"
          ></ExpTreeOutline>
        ) : (
          <div class="gray-info-message hairline-b">No selected dom found</div>
        )}
        <div class="header ">
          <div class="inline-flex gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            Host
          </div>
        </div>
        {props.qContext?.value?.host ? (
          <ExpTreeOutline
            target={props.qContext.value.host}
            class="py-[2px] px-1 font-mono text-[11px]"
          ></ExpTreeOutline>
        ) : (
          <div class="gray-info-message hairline-b">
            No qwik component found
          </div>
        )}
      </div>
    </div>
  );
});
