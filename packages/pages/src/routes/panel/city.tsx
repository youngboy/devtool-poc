import { component$, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  useVisibleTask$(() => console.log("runs in the browser", window.chrome), {
    eagerness: "visible", // 'load' | 'visible' | 'idle'
  });
  return <div>hello 2 panel</div>;
});
