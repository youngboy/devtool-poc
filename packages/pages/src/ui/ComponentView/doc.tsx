import {
  component$,
  noSerialize,
  useBrowserVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import InspectEl from ".";
import { getQcContext } from "./utils";

interface ClassProps {
  class?: string;
}

export const Selected = component$((props: ClassProps) => {
  const qContext = useSignal<ReturnType<typeof getQcContext> | undefined>(
    undefined
  );
  useBrowserVisibleTask$(async () => {
    qContext.value = noSerialize(
      getQcContext(document.querySelector("[role='tab']") || undefined)
    );
  });
  // FIXME: (qwik-jsx) warning about useBrowserVisibleTask$ if without outer placeholder div
  return (
    <div>
      <InspectEl qContext={qContext} />
    </div>
  );
});
