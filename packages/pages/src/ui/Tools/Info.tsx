import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { DevData } from "~/routes/_dev";
import { DisplayDataType, getDisplayTableData, Table } from "../Table";

export interface InfoToolProps {}
export const routerHeaders = [
  {
    title: "Pattern",
    accessor: (row: any) =>
      row.pattern
        .replace(/\\/g, "")
        .replace("^", "")
        .replace("?$", "")
        .replace("$", ""),
  },
  {
    title: "Params",
    accessor: "paramNames",
  },
  {
    title: "Loaders",
    accessor: (row: any) => row.loaders.join(", "),
  },
];
export const menuHeaders = [
  {
    title: "Path",
    accessor: "pathname",
  },
  {
    title: "Loader",
    accessor: "loader",
  },
];
export default component$<InfoToolProps>(() => {
  const infoData = useSignal<DevData>();
  const routerData = useSignal<DisplayDataType>({
    displayHeaders: routerHeaders.map((r) => r.title),
    displayRows: [],
  });
  const menusData = useSignal<DisplayDataType>({
    displayHeaders: menuHeaders.map((r) => r.title),
    displayRows: [],
  });
  useVisibleTask$(() => {
    fetch("/_dev")
      .then((res) => res.json())
      .then((body) => {
        infoData.value = body;
        routerData.value = getDisplayTableData({
          headers: routerHeaders,
          rows: infoData.value?.routes || [],
        });
        menusData.value = getDisplayTableData({
          headers: menuHeaders,
          rows: infoData.value?.menus || [],
        });
      });
  });
  return (
    <div class="text-fg-primary">
      {infoData.value && (
        <>
          <div class="report-section">
            <div class="report-header">
              <div class="report-title">Info</div>
            </div>
            <div class="report-row mb-2 grid grid-cols-[min-content_1fr] leading-7">
              {Object.keys(infoData.value.versions).map((k) => (
                <div class="contents" key={k}>
                  <div class="text-fg-secondary px-[6px] text-right">{k}</div>
                  <div class="px-[6px]">{infoData.value?.versions[k]}</div>
                </div>
              ))}
            </div>
          </div>

          <div class="report-section">
            <div class="report-header">
              <div class="report-title">Router</div>
            </div>
            <div class="report-row">
              <Table displayData={routerData.value} />
            </div>
          </div>

          <div class="report-section">
            <div class="report-header">
              <div class="report-title">Menus</div>
            </div>
            <div class="report-row">
              <Table displayData={menusData.value} />
            </div>
          </div>
        </>
      )}
    </div>
  );
});
