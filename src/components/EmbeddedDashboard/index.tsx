import React, { FC } from "react";
import { Space } from "@looker/components";

const EmbeddedDashboard: FC<{ dashboardId: string }> = ({ dashboardId }) => {
  return (
    <Space flex={1} height={"100%"}>
      <iframe
        src={`https://makingscience.eu.looker.com/embed/dashboards/${dashboardId}`}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </Space>
  );
};

export default EmbeddedDashboard;
