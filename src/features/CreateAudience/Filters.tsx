import React from "react";
import { DashboardFilter } from "@looker/filter-components";

const Filters = () => {
  return (
    <DashboardFilter
      filter={{
        allow_multiple_values: true,
        field: {
          is_numeric: true,
        },
        id: "1",
        name: "Cost",
        type: "field_filter",
      }}
      onChange={console.log}
    />
  );
};

export default Filters;
