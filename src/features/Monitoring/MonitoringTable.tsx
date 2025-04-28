import {
  DataTable,
  DataTableCell,
  DataTableColumns,
  DataTableItem,
  DateFormat,
} from "@looker/components";
import React, { FC } from "react";
import { IActivationsResult } from "./useActivations";

const MonitoringTable: FC<{ tableData: IActivationsResult[] }> = ({
  tableData,
}) => {
  const columns: DataTableColumns = [
    {
      canSort: false,
      id: "query_id",
      title: "Query ID",
      type: "string",
      size: "medium",
    },
    {
      canSort: false,
      id: "activation_endpoint",
      title: "Activation Endpoint",
      size: 80,
      type: "string",
    },

    {
      canSort: false,
      id: "activation_name",
      title: "Activation Name",
      size: "medium",
      type: "string",
    },
    {
      canSort: false,
      id: "audience_id",
      title: "Audience ID",
      size: "medium",
      type: "string",
    },
    {
      canSort: false,
      id: "creator_email",
      title: "Creator Email",
      size: "medium",
      type: "string",
    },
    {
      canSort: false,
      id: "creator_name",
      title: "Creator Name",
      size: "medium",
      type: "string",
    },
    {
      canSort: false,
      id: "creator_lastname",
      title: "Creator Lastname",
      size: "medium",
      type: "string",
    },
    {
      canSort: false,
      id: "created_at",
      title: "Creation Time",
      size: "medium",
      type: "date",
    },
    {
      canSort: false,
      id: "updated_at",
      title: "Last Updated",
      size: "medium",
      type: "date",
    },
  ];

  const items = tableData.map(
    ({
      activation_endpoint: activationEndpoint,
      activation_name: activationName,
      audience_id: audienceId,
      creator_email: creatorEmail,
      creator_lastname: creatorLastname,
      creator_name: creatorName,
      query_id: queryId,
      created_at: createdAt,
      updated_at: updatedAt,
    }) => {
      const updatedAtDate = new Date(updatedAt || 0);
      const createdAtDate = new Date(createdAt || 0);

      return (
        <DataTableItem id={`${queryId}`} key={queryId}>
          <DataTableCell style={{ lineHeight: "40px" }}>
            {queryId}
          </DataTableCell>
          <DataTableCell style={{ lineHeight: "40px" }}>
            {activationEndpoint}
          </DataTableCell>
          <DataTableCell style={{ lineHeight: "40px" }}>
            {activationName}
          </DataTableCell>
          <DataTableCell style={{ lineHeight: "40px" }}>
            {audienceId}
          </DataTableCell>
          <DataTableCell>{creatorEmail}</DataTableCell>
          <DataTableCell>{creatorName}</DataTableCell>
          <DataTableCell>{creatorLastname}</DataTableCell>
          <DataTableCell>
            <DateFormat>{createdAtDate}</DateFormat>
          </DataTableCell>
          <DataTableCell>
            <DateFormat>{updatedAtDate}</DateFormat>
          </DataTableCell>
        </DataTableItem>
      );
    }
  );

  return (
    <DataTable caption="Audiences Table" columns={columns}>
      {items}
    </DataTable>
  );
};

export default MonitoringTable;
