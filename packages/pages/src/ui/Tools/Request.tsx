import { component$, useSignal } from "@builder.io/qwik";
import { ResizerWidget } from "~/ui/ResizerWidget";
import ExpTreeOutline from "../ExpTreeOutline";
import { DisplayDataType, getDisplayTableData, Table } from "../Table";

export interface PerformanceProps {}

export const headers = [
  {
    title: "DateTime",
    accessor: "dateTime",
  },
  {
    title: "Type",
    accessor: "type",
  },
  {
    title: "Address",
    accessor: "address",
  },
];

export const fixtures = [
  {
    dateTime: new Date().toLocaleString(),
    type: "ServerRoute",
    address: "/manual",
  },
  {
    dateTime: new Date().toLocaleString(),
    type: "ClientRoute",
    address: "/manual/devtools-panel",
  },
  {
    dateTime: new Date().toLocaleString(),
    type: "Loader",
    address: "/api/test",
  },
  {
    dateTime: new Date().toLocaleString(),
    type: "Action",
    address: "/api/xx",
  },
  {
    dateTime: new Date().toLocaleString(),
    type: "$Server",
    address: "/component/qrl",
  },
];

export default component$<PerformanceProps>((props) => {
  const requests = useSignal<DisplayDataType>(
    getDisplayTableData({
      headers: headers,
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
          style={{
            "--table-row-height": "20px",
          }}
          placeholder
          handleSelect$={(row, rowIndex) => {
            selectedRow.value = fixtures[rowIndex];
          }}
          displayData={requests.value}
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
