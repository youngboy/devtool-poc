import { component$, PropFunction, Signal } from "@builder.io/qwik";

type ItemType = {
  title: string;
  icon: string;
};
export interface ToolSidebarProps {
  treeData: {
    title: string;
    children: ItemType[];
  }[];
  selected: Signal<ItemType>;
  onSelected$: PropFunction<(item: ItemType) => void>;
}

export const ToolSidebar = component$<ToolSidebarProps>((props) => {
  return (
    <ol
      class="tree-outline"
      style={{
        "--tree-row-mh": "20px",
        "--tree-select": "none",
      }}
    >
      {props.treeData.map((item, index) => (
        <>
          <li
            class={[
              "not-expand-icon px-2 pt-[10px] pb-[6px]",
              index > 0 ? "border-t border-details-hairline" : undefined,
            ]}
          >
            {item.title}
          </li>
          <ol class="tree-outline pb-[10px]">
            {item.children.map((child) => (
              <li
                class={{
                  selected: props.selected.value.title === child.title,
                }}
                onPointerDown$={() => {
                  props.onSelected$(child);
                }}
                tabIndex={0}
              >
                <div class="selection"></div>
                <div class="leading-icons">
                  <span class={`mediumicon ${child.icon} icon-mask`}></span>
                </div>
                <span>{child.title}</span>
              </li>
            ))}
          </ol>
        </>
      ))}
    </ol>
  );
});
