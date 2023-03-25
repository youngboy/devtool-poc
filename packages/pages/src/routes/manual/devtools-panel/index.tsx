import {
  Component,
  component$,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { Placeholder } from "~/ui/Placeholder";
import { ResizerWidget } from "~/ui/ResizerWidget";
import TabList from "~/ui/TabList";
import InfoTool from "~/ui/Tools/Info";
import PerformanceTool from "~/ui/Tools/Performance";
import RequestTool from "~/ui/Tools/Request";
import { ToolSidebar } from "~/ui/Tools/Sidebar";

type MainCmp = Component<{
  class?: string;
}>;

export default component$(() => {
  const tabHeaders = [{ title: "Qwik Panel", id: "Qwik Panel" }];
  const activeGuiTabId = useSignal<string | number>(-1);
  const sidebarData = [
    {
      title: "Qwik",
      children: [
        {
          title: "Element",
          icon: "mediumicon-list",
        },
        {
          title: "Performance",
          icon: "mediumicon-table",
        },
      ],
    },
    {
      title: "Qwik City",
      children: [
        {
          title: "Info",
          icon: "mediumicon-manifest",
        },
        {
          title: "Requests",
          icon: "mediumicon-fetch",
        },
      ],
    },
  ];
  const mainEls: Record<string, MainCmp> = {
    Info: InfoTool,
    Performance: PerformanceTool,
    Requests: RequestTool,
  };
  // FIXME: set MainCmp type will complaining 'Identifier ("mainContent") can not be captured...
  const mainContent = useSignal<any | undefined | null>(null);
  const selectedTool = useSignal(sidebarData[1].children[0]);
  // FIXME: useTask here causing mainContent lose reactive bindings
  useVisibleTask$(({ track }) => {
    const item = track(() => selectedTool.value);
    mainContent.value = mainEls[item.title] || undefined;
  });

  return (
    <div class="border-details-hairline border-b">
      <TabList activeTabId={activeGuiTabId} headers={tabHeaders} />
      <ResizerWidget class="h-96" defaultSize={208}>
        <ToolSidebar
          q:slot="nav"
          selected={selectedTool}
          treeData={sidebarData}
          onSelected$={(val) => {
            selectedTool.value = val;
          }}
        />
        <div q:slot="main" class="relative h-full">
          {mainContent.value === null ? null : mainContent.value ===
            undefined ? (
            <Placeholder class="mt-12 flex justify-center p-6 text-2xl" />
          ) : (
            <mainContent.value />
          )}
        </div>
      </ResizerWidget>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik City View",
};
