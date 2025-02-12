import {
  DataTable,
  DataTableCell,
  DataTableColumns,
  DataTableItem,
} from "@looker/components";
import React, { FC, useMemo } from "react";

const SnapshotsTable: FC<{ tableData: Record<string, string>[] }> = ({
  tableData,
}) => {
  const columns = useMemo<DataTableColumns>(
    () =>
      Object.keys(tableData[0]).map((value, index) => ({
        id: String(index),
        title: value,
        type: "string",
        size: "large",
      })),
    []
  );

  const items = tableData.map((item, index) => (
    <DataTableItem id={String(index)} key={index}>
      {Object.values(item).map((value, index) => (
        <DataTableCell key={index}>{value}</DataTableCell>
      ))}
    </DataTableItem>
  ));

  return (
    <DataTable caption="SnapshotsTable" columns={columns}>
      {items}
    </DataTable>
  );
};

export default SnapshotsTable;
