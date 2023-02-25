import { component$ } from "@builder.io/qwik";

export interface PlaceholderProps {
  class?: string;
}

export const Placeholder = component$<PlaceholderProps>((props) => {
  return <div class={[props.class]}>🚧 Under construction 🚧</div>;
});
