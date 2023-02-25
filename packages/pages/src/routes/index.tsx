import { component$ } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";

export default component$(() => {
  const sections: {
    section: string;
    flexRow?: boolean;
    pages: {
      title: string;
      href?: string;
      subTitle?: string;
    }[];
  }[] = [
    {
      section: "Pages",
      pages: [
        {
          title: "Component View",
          href: "/manual/component-view",
          subTitle:
            "Get detailed views on selected element, used in Elements panel or custom component tree viewing widget",
        },
        {
          title: "Devtools Panel View",
          href: "/manual/devtools-panel",
          subTitle:
            "View server & client hybrid navigation, and checkout server side logs, features... all together within the browser",
        },
      ],
    },
    {
      section: "Components",
      pages: [
        {
          title: "TabList",
          subTitle: "collapse information base on header switchers",
        },
        {
          title: "ExpTreeOutline",
          subTitle:
            "viewer to explore tree structure expression, Javascript object or DOM etc..",
        },
      ],
    },
    {
      section: "Common CSS",
      flexRow: true,
      pages: [
        {
          title: "Button",
        },
        {
          title: "Heading",
        },
        {
          title: "Icon",
        },
        {
          title: "Input",
        },
      ],
    },
  ];
  return (
    <div class="index-page">
      <h1 class="mb-[34px] px-4 py-3 text-lg">DevTools</h1>
      {sections.map((s) => (
        <>
          <div class="header border-t border-t-details-hairline">
            {s.section}
          </div>
          <ul
            class={`mt-1 mr-3 ml-[2px] flex max-w-md ${
              s.flexRow ? "flex-row" : "flex-col"
            } gap-1 py-[10px] px-4`}
          >
            {s.pages.map((p) => (
              <li class="basis-auto cursor-pointer border border-details-hairline px-2 text-sm leading-[200%] text-link">
                {p.href ? (
                  <Link href={p.href}>
                    <div>{p.title}</div>
                    <div class="pb-2 text-[13px] leading-[125%] text-fg-secondary hover:text-link">
                      {p.subTitle}
                    </div>
                  </Link>
                ) : (
                  <>
                    <div>{p.title}</div>
                    {p.subTitle && (
                      <div class="pb-2 text-[13px] leading-[125%] text-fg-secondary hover:text-link">
                        {p.subTitle}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ))}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Components Overview",
};
