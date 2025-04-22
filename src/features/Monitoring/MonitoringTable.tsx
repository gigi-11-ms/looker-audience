import {
  DataTable,
  DataTableCell,
  DataTableColumns,
  DataTableItem,
  doDataTableSort,
} from "@looker/components";
import React, { FC, useEffect, useState } from "react";
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
    }) => {
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
