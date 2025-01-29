import {
  DataTable,
  DataTableAction,
  DataTableCell,
  DataTableColumns,
  DataTableItem,
  DateFormat,
  doDataTableSort,
} from "@looker/components";
import { ILookWithDashboards } from "@looker/sdk";
import React, { FC, useState } from "react";
import { openModal, useModalContext } from "../../context/ModalContext";
import RunAction from "../Actions/RunAction";

const AudiencesTable: FC<{ tableData: ILookWithDashboards[] }> = ({
  tableData,
}) => {
  const [data, setData] = useState(tableData);
  const { dispatch } = useModalContext();

  const [columns, setColumns] = useState<DataTableColumns>([
    {
      canSort: true,
      id: "id",
      title: "ID",
      type: "number",
      hide: true,
    },
    {
      canSort: true,
      id: "title",
      title: "Name",
      size: 80,
      type: "string",
    },
    {
      canSort: true,
      id: "updated_at",
      title: "Last Updated",
      size: "medium",
      type: "date",
    },
    {
      canSort: false,
      id: "model",
      title: "Model",
      size: "medium",
      type: "string",
    },
  ]);

  const onSort = (id: string, sortDirection: "asc" | "desc") => {
    const { columns: sortedColumns, data: sortedData } = doDataTableSort(
      data,
      columns,
      id,
      sortDirection
    );
    setData(sortedData);
    setColumns(sortedColumns);
  };

  const items = data.map(
    ({ id = "", title, updated_at, model: { label: modelLabel } = {} }) => {
      const updatedAt = new Date(updated_at || 0);
      const lookTitle = title || "";
      const actions = (
        <>
          <DataTableAction onClick={() => console.log("edit")}>
            Edit
          </DataTableAction>
          <DataTableAction
            onClick={() =>
              openModal(dispatch, <RunAction lookId={id} title={lookTitle} />)
            }
          >
            Send
          </DataTableAction>
          <DataTableAction onClick={() => console.log(id, "add schedule")}>
            Add Schedule
          </DataTableAction>
        </>
      );

      return (
        <DataTableItem id={`${id}`} key={id} actions={actions}>
          <DataTableCell>{id}</DataTableCell>
          <DataTableCell style={{ lineHeight: "40px" }}>{title}</DataTableCell>
          <DataTableCell>
            <DateFormat>{updatedAt}</DateFormat>
          </DataTableCell>
          <DataTableCell>{modelLabel}</DataTableCell>
        </DataTableItem>
      );
    }
  );

  return (
    <DataTable caption="Cheeses example" onSort={onSort} columns={columns}>
      {items}
    </DataTable>
  );
};

export default AudiencesTable;
