import {
  component$,
  Slot,
  useBrowserVisibleTask$,
  useSignal,
} from "@builder.io/qwik";

export interface ResizerWidgetProps {
  defaultSize: number;
  class?: string;
  vertical?: boolean;
}

export const ResizerWidget = component$<ResizerWidgetProps>((props) => {
  const size = useSignal(props.defaultSize);
  const containerRef = useSignal<Element>();
  const maxSize = useSignal(Infinity);
  const edgeSafeMargin = 80;

  useBrowserVisibleTask$(() => {
    const rect = containerRef.value?.getBoundingClientRect();
    if (rect) {
      maxSize.value = props.vertical ? rect.height : rect.width;
    }
  });
  return (
    <div
      class={[
        "relative flex overflow-hidden",
        props.vertical ? "flex-col" : "flex-row",
        props.class,
      ]}
      style={{
        "--nav-size": `${size.value}px`,
      }}
      ref={containerRef}
    >
      <div
        class={[
          "relative flex-none overflow-auto border-details-hairline",
          props.vertical ? "border-b" : "border-r",
        ]}
        style={{
          flexBasis: "var(--nav-size)",
        }}
      >
        <Slot name="nav" />
      </div>
      <div class="relative flex-auto overflow-auto">
        <Slot name="main" />
      </div>
      <div
        class={[
          "absolute inset-0 z-50 ",
          props.vertical
            ? "mt-[-3px] h-[6px] cursor-ns-resize"
            : "ml-[-3px] w-[6px] cursor-ew-resize",
        ]}
        style={{
          top: props.vertical ? "var(--nav-size)" : undefined,
          left: !props.vertical ? "var(--nav-size)" : undefined,
        }}
        onMouseDown$={(mouseDownEvent) => {
          const startSize = size.value;
          const startPosition = {
            x: mouseDownEvent.pageX,
            y: mouseDownEvent.pageY,
          };

          const throttleDuration = 10;
          let timeout: NodeJS.Timeout | undefined = undefined;

          function setSize(delta: number) {
            size.value = Math.min(
              Math.max(edgeSafeMargin, delta + startSize),
              maxSize.value - edgeSafeMargin
            );
          }

          function onMouseMove(mouseMoveEvent: MouseEvent) {
            if (timeout === undefined) {
              if (props.vertical) {
                const offset = mouseMoveEvent.pageY - startPosition.y;
                setSize(offset);
              } else {
                const offset = mouseMoveEvent.pageX - startPosition.x;
                setSize(offset);
              }
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
      />
    </div>
  );
});
