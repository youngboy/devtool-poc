import { component$, PropFunction, useSignal } from "@builder.io/qwik";

type Row = Record<string, unknown>;
type Header = {
  title: string;
  accessor: string | ((colData: unknown) => string);
};
export function getDisplayTableData({
  headers,
  rows,
}: {
  headers: Header[];
  rows: Row[];
}) {
  const displayHeaders = headers.map((h) => {
    return h.title;
  });
  const displayRows = rows.map((row) => {
    return headers.map((head) => {
      if (typeof head.accessor === "string") {
        return row[head.accessor] as string;
      }
      return head.accessor(row);
    });
  });
  return {
    displayHeaders,
    displayRows,
  };
}

export type DisplayDataType = ReturnType<typeof getDisplayTableData>;
export interface TableProps {
  displayData: DisplayDataType;
  class?: string;
  style?: any;
  fillBottom?: boolean;
  placeholder?: boolean;
  handleSelect$?: PropFunction<(row: string[], rowIndex: number) => void>;
}

export const Table = component$<TableProps>((props) => {
  const { displayHeaders, displayRows } = props.displayData;
  const colWidth = `${(1 / displayHeaders.length) * 100}%`;
  const selectedRowIndex = useSignal(-1);
  return (
    <table
      style={props.style}
      class={["border border-details-hairline", props.class]}
    >
      <colgroup>
        {displayHeaders.map(() => (
          <col style={{ width: colWidth }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {displayHeaders.map((h) => (
            <th>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayRows.map((row, rowIndex) => (
          <tr
            tabIndex={0}
            class={{ selected: rowIndex === selectedRowIndex.value }}
            onPointerDown$={() => {
              selectedRowIndex.value = rowIndex;
              props.handleSelect$?.apply(null, [row, rowIndex]);
            }}
          >
            {row.map((col) => (
              <td>{col || <div>--</div>}</td>
            ))}
          </tr>
        ))}
        {props.placeholder ? (
          <tr
            tabIndex={0}
            class={{ selected: displayRows.length === selectedRowIndex.value }}
            onPointerDown$={() => {
              selectedRowIndex.value = displayRows.length;
              props.handleSelect$?.apply(null, [[], displayRows.length]);
            }}
          >
            {displayHeaders.map((h) => (
              <td></td>
            ))}
          </tr>
        ) : null}
        {props.fillBottom ? (
          <tr class="fill-bottom-row h-auto">
            {displayHeaders.map((h) => (
              <td class="h-auto border-b-0"></td>
            ))}
          </tr>
        ) : null}
      </tbody>
    </table>
  );
});
