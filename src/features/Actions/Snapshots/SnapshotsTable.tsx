import {
  DataTable,
  DataTableCell,
  DataTableColumns,
  DataTableItem,
} from "@looker/components";
import React, { FC, useMemo } from "react";
import styled from "styled-components";

const SnapshotsTable: FC<{
  tableData: Record<string, string>[];
  isLoading: boolean;
}> = ({ tableData, isLoading }) => {
  const columns = useMemo<DataTableColumns>(
    () =>
      tableData && tableData.length > 0
        ? Object.keys(tableData[0]).map((value, index) => ({
            id: String(index),
            title: value,
            type: "string",
            size: "large",
          }))
        : [],
    [tableData]
  );

  const items = tableData?.map((item, index) => (
    <DataTableItem id={String(index)} key={index}>
      {Object.values(item).map((value, index) => (
        <DataTableCell key={index}>{value}</DataTableCell>
      ))}
    </DataTableItem>
  ));

  return (
    <DataTableStyled
      caption="SnapshotsTable"
      columns={columns}
      state={
        isLoading ? "loading" : !tableData?.length ? "noResults" : undefined
      }
    >
      {items}
    </DataTableStyled>
  );
};

export default SnapshotsTable;

const DataTableStyled = styled(DataTable)`
  max-height: calc(100vh - 220px);
  overflow: auto;
`;
