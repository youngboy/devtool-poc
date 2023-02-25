import { component$, QRL, Slot, useSignal, useTask$ } from "@builder.io/qwik";

export interface NodeSearchProps {
  onSelect$: QRL<(val: HTMLElement) => void>;
}

// TODO: add tooltip to have preview summary at instant
//       or not
export default component$<NodeSearchProps>((props) => {
  const stateOn = useSignal(false);
  const searchRef = useSignal<HTMLElement>();
  const overlayRef = useSignal<HTMLElement>();

  useTask$(({ track }) => {
    const isOn = track(() => stateOn.value);
    const overlay = overlayRef.value;

    if (!isOn && overlay) {
      overlay.style.setProperty("visibility", "hidden");
    }
  });
  return (
    <div>
      <div
        class="pointer-events-none fixed  bg-selection-bg"
        ref={overlayRef}
      ></div>
      <div
        ref={searchRef}
        onMouseOver$={(e) => {
          if (!stateOn.value) {
            return;
          }
          const overlay = overlayRef.value;
          const hoveredEl = e.target as HTMLElement;
          if (!hoveredEl || !overlay) {
            return;
          }
          const rect = hoveredEl.getBoundingClientRect();
          overlay.style.setProperty("height", rect.height + "px");
          overlay.style.setProperty("width", rect.width + "px");
          overlay.style.setProperty("top", rect.top + "px");
          overlay.style.setProperty("left", rect.left + "px");
          overlay.style.setProperty("visibility", "visible");
        }}
        preventdefault:click
        onClick$={(e) => {
          if (!stateOn.value) {
            return;
          }
          if (e.target && e.target instanceof HTMLElement) {
            props.onSelect$(e.target);
            stateOn.value = false;
          }
        }}
      >
        <Slot />
      </div>
      <div class="flex h-7 items-center gap-2 border-t border-b border-details-hairline px-2 leading-6">
        <button
          onClick$={() => {
            stateOn.value = !stateOn.value;
          }}
          class={`toolbar ${stateOn.value ? "state-on" : ""}`}
        >
          <span class="icon icon-search-node"></span>
        </button>
        Element Inspector
      </div>
      <div class="header">Element</div>
    </div>
  );
});
