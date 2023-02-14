import { component$, useSignal } from "@builder.io/qwik";
import { DisplayDataType, Table } from "../Table";

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

export default component$<PerformanceProps>((props) => {
  const perfData = useSignal<DisplayDataType>({
    displayHeaders: perfHeaders.map((r) => r.title),
    displayRows: [
      [new Date().toLocaleString(), "24x", "VirtualElement", ""],
      [new Date().toLocaleString(), "32x", "VirtualElement", ""],
    ],
  });
  return (
    <div class="text-fg-primary">
      <Table
        fillBottom
        class="absolute inset-0 border-0"
        style={{
          "--table-row-height": "20px",
        }}
        handleSelect$={(row) => {
          console.log(row);
        }}
        displayData={perfData.value}
      />
    </div>
  );
});
