import {
  DataTable,
  DataTableAction,
  DataTableCell,
  DataTableColumns,
  DataTableItem,
  DateFormat,
  doDataTableSort,
} from "@looker/components";
import React, { FC, useEffect, useState } from "react";
import { openModal, useModalContext } from "../../context/ModalContext";
import { IAudiencesResult } from "./useAudiences";
import EditAudience from "./EditAudience";
import RunAction from "../Actions/RunAction";
import useDeleteAudience from "./useDeleteAudience";

const AudiencesTable: FC<{ tableData: IAudiencesResult[] }> = ({
  tableData,
}) => {
  const [data, setData] = useState(() => tableData);
  const { dispatch } = useModalContext();
  const { mutate: deleteAudience, isLoading: isDeleteAudienceLoading } =
    useDeleteAudience();

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
      id: "audience_name",
      title: "Name",
      size: 80,
      type: "string",
    },

    {
      canSort: false,
      id: "email",
      title: "Email",
      size: "medium",
      type: "string",
    },
    {
      canSort: false,
      id: "username",
      title: "Username",
      size: "medium",
      type: "string",
    },
    {
      canSort: true,
      id: "updated_timestamp",
      title: "Last Updated",
      size: "medium",
      type: "date",
      sortDirection: "desc",
    },
    {
      canSort: true,
      id: "created_timestamp",
      title: "Created At",
      size: "medium",
      type: "date",
      sortDirection: "desc",
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

  // Maybe there is better solution for this
  useEffect(() => {
    const { columns: sortedColumns, data: sortedData } = doDataTableSort(
      data,
      columns,
      "updated_at",
      "desc"
    );
    setData(sortedData);
    setColumns(sortedColumns);
  }, []);

  const items = data.map(
    ({
      audience_id: id,
      audience_name: title,
      updated_timestamp,
      created_timestamp,
      email,
      username,
      filters,
    }) => {
      const updatedAt = new Date(updated_timestamp || 0);
      const createdAt = new Date(created_timestamp || 0);

      const actions = (
        <>
          <DataTableAction
            onClick={() =>
              openModal(
                dispatch,
                <EditAudience id={id} title={title} filters={filters} />
              )
            }
            disabled={isDeleteAudienceLoading}
          >
            Edit
          </DataTableAction>
          <DataTableAction
            onClick={() =>
              openModal(dispatch, <RunAction audienceId={id} title={title} />)
            }
            disabled={isDeleteAudienceLoading}
          >
            Send
          </DataTableAction>
          <DataTableAction
            onClick={() => console.log(id, "add schedule")}
            disabled={isDeleteAudienceLoading}
          >
            Add Schedule
          </DataTableAction>
          <DataTableAction
            onClick={() => deleteAudience(id)}
            disabled={isDeleteAudienceLoading}
          >
            Delete
          </DataTableAction>
        </>
      );

      return (
        <DataTableItem id={`${id}`} key={id} actions={actions}>
          <DataTableCell>{id}</DataTableCell>
          <DataTableCell style={{ lineHeight: "40px" }}>{title}</DataTableCell>
          <DataTableCell style={{ lineHeight: "40px" }}>{email}</DataTableCell>
          <DataTableCell style={{ lineHeight: "40px" }}>
            {username}
          </DataTableCell>
          <DataTableCell>
            <DateFormat>{updatedAt}</DateFormat>
          </DataTableCell>
          <DataTableCell>
            <DateFormat>{createdAt}</DateFormat>
          </DataTableCell>
        </DataTableItem>
      );
    }
  );

  return (
    <DataTable caption="Audiences Table" onSort={onSort} columns={columns}>
      {items}
    </DataTable>
  );
};

export default AudiencesTable;
