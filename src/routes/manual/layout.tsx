import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="index-page">
      <h1 class=" px-4 py-3 text-lg">DevTools</h1>
      <div class="mb-4 px-4">
        <Link class="text-link underline" href="/">
          back to index
        </Link>
      </div>
      <Slot />
    </div>
  );
});
