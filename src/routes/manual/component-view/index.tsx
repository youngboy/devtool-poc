import { component$, noSerialize, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Counter from "~/ui/7GUIs/Counter";
import TemperatureConverter from "~/ui/7GUIs/TemperatureConverter";
import ComponentView from "~/ui/ComponentView";
import { getQcContext } from "~/ui/ComponentView/utils";
import NodeSearch from "~/ui/NodeSearch";
import TabList from "~/ui/TabList";

export default component$(() => {
  const activeGuiTabId = useSignal<string | number>(-1);
  const qContext = useSignal<ReturnType<typeof getQcContext> | undefined>(
    undefined
  );

  const guis = [
    { title: "counter", id: "counter", view: Counter },
    { title: "temperature", id: "temperature", view: TemperatureConverter },
  ];

  return (
    <div>
      <TabList activeTabId={activeGuiTabId} headers={guis} />
      <NodeSearch
        onSelect$={(val) => {
          qContext.value = noSerialize(getQcContext(val));
        }}
      >
        <div class=" min-h-[73px] overflow-auto">
          {guis
            .filter((g) => g.id === activeGuiTabId.value)
            .map((el) => (
              <div class="m-3 flex items-center">
                <el.view />
              </div>
            ))}
        </div>
      </NodeSearch>
      <div class=" hairline-b h-60  overflow-auto">
        <ComponentView qContext={qContext} />
      </div>

      <div class="p-3 text-token-tag">
        TODO
        <ul class="list-disc pl-4">
          <li>
            Web based devtools Plugin for REPL editor: re-render on each qwik's
            post render; re-rendering performance
          </li>
          <li>Embed page for Chrome devtools extension</li>
          <li>
            Lazy, for loop data like `$parent` or value that possible changed
            later
          </li>
          <li>Readable name of Signal</li>
          <li>Highlighting or summarize Signal's subscribers</li>
          <li>View $component's lexical scope</li>
        </ul>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Component Attribute View",
};
