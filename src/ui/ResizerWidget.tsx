import { component$, Slot, useSignal } from "@builder.io/qwik";

export interface ResizerWidgetProps {
  defaultSize: number;
  class?: string;
}

export const ResizerWidget = component$<ResizerWidgetProps>((props) => {
  const size = useSignal(props.defaultSize);
  return (
    <div
      class={`relative flex overflow-hidden ${props.class}`}
      style={{
        "--sidebar-size": `${size.value}px`,
      }}
    >
      <div
        class="flex-none border-r border-details-hairline"
        style={{
          flexBasis: "var(--sidebar-size)",
        }}
      >
        <Slot name="sidebar" />
      </div>
      <div class="relative flex-auto">
        <Slot name="main" />
      </div>
      <div
        class="absolute top-0 bottom-0 z-50 ml-[-3px] w-[6px] cursor-ew-resize"
        onMouseDown$={(mouseDownEvent) => {
          const startSize = size.value;
          const startPosition = {
            x: mouseDownEvent.pageX,
            y: mouseDownEvent.pageY,
          };

          const throttleDuration = 10;
          let timeout: NodeJS.Timeout | undefined = undefined;

          function onMouseMove(mouseMoveEvent: MouseEvent) {
            if (timeout === undefined) {
              const offsetX = mouseMoveEvent.pageX - startPosition.x;
              size.value = Math.max(120, offsetX + startSize);
              timeout = setTimeout(() => {
                timeout = undefined;
              }, throttleDuration);
            }
          }
          function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
          }

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp, { once: true });
        }}
        style={{
          left: "var(--sidebar-size)",
        }}
      />
    </div>
  );
});
