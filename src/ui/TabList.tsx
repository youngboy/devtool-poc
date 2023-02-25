import {
  component$,
  useSignal,
  useBrowserVisibleTask$,
  useTask$,
  Signal,
} from "@builder.io/qwik";

interface TabListProps {
  activeTabId: Signal<string | number>;
  headers: {
    title: string;
    id: string;
  }[];
}

export default component$((props: TabListProps) => {
  const tablistRef = useSignal<Element>();
  const tabActiveStats = useSignal({
    offset: 0,
    width: 0,
  });
  useTask$(({ track }) => {
    const id = track(() => props.activeTabId.value);
    // FIXME: can't track ref element
    // const tabList = track(() => tablistRef.value)
    const tabList = tablistRef.value;
    if (tabList) {
      const index = props.headers.findIndex((i) => i.id === id);
      const activeEl = tabList.children[index];
      const offset = [...tabList.children]
        .filter((node, prevIndex) => prevIndex < index)
        .reduce((acc, item) => {
          return acc + item.getBoundingClientRect?.()?.width || 0;
        }, 0);
      tabActiveStats.value = {
        width: activeEl?.getBoundingClientRect?.()?.width || 0,
        offset,
      };
    }
  });
  useBrowserVisibleTask$(() => {
    props.activeTabId.value = props.headers[0]?.id;
  });

  return (
    <div
      role="tablist"
      ref={tablistRef}
      class="relative flex w-full flex-pane border-y border-details-hairline bg-elevation-1 leading-[22px] text-fg-secondary"
      style={`
  --tab-active-offset: ${tabActiveStats.value.offset}px;
  --tab-active-width: ${tabActiveStats.value.width}px;
`}
    >
      {props.headers.map((el) => (
        <div
          role="tab"
          onPointerDown$={() => (props.activeTabId.value = el.id)}
          class={`${
            el.id === props.activeTabId.value
              ? "bg-elevation-2 text-tab-selected dark:bg-black"
              : "hover:bg-elevation-2"
          } h-[26px] border-x-2 border-transparent py-[2px] px-2 `}
        >
          {el.title}
        </div>
      ))}
      <div class="absolute bottom-[-1px] left-0 h-[2px] w-[var(--tab-active-width)] origin-top-left translate-x-[var(--tab-active-offset)] scale-y-75 bg-legacy-accent transition-transform dark:hidden"></div>
    </div>
  );
});
