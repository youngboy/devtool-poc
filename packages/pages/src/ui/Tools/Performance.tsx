import { component$, useSignal } from "@builder.io/qwik";
import { ResizerWidget } from "~/ui/ResizerWidget";
import ExpTreeOutline from "../ExpTreeOutline";
import { DisplayDataType, getDisplayTableData, Table } from "../Table";

export interface PerformanceProps {}

export const perfHeaders = [
  {
    title: "DateTime",
    accessor: "dateTime",
  },
  {
    title: "Operations",
    accessor: "ops",
  },
  {
    title: "Roots",
    accessor: "roots",
  },
  {
    title: "Components",
    accessor: "components",
  },
];

export const fixtures = [
  {
    dateTime: new Date().toLocaleString(),
    ops: "24x",
    roots: "VirtualElement",
  },
  {
    dateTime: new Date().toLocaleString(),
    ops: "32x",
    roots: "VirtualElement",
  },
];

export default component$<PerformanceProps>((props) => {
  const perfData = useSignal<DisplayDataType>(
    getDisplayTableData({
      headers: perfHeaders,
      rows: fixtures,
    })
  );
  const selectedRow = useSignal();
  return (
    <div class="h-full text-fg-primary">
      <ResizerWidget class="h-full" vertical defaultSize={280}>
        <Table
          q:slot="nav"
          fillBottom
          class="absolute inset-0 border-0"
          placeholder
          style={{
            "--table-row-height": "20px",
          }}
          handleSelect$={(row, rowIndex) => {
            selectedRow.value = fixtures[rowIndex];
          }}
          displayData={perfData.value}
        />
        <div q:slot="main" class="h-full">
          {selectedRow.value ? (
            <div class="py-[2px]">
              <ExpTreeOutline
                target={selectedRow.value ? (selectedRow.value as any) : {}}
              />
            </div>
          ) : (
            <div class="flex h-full items-center justify-center p-7 text-[1.5em] font-bold text-fg-secondary">
              Select a value to preview
            </div>
          )}
        </div>
      </ResizerWidget>
    </div>
  );
});
