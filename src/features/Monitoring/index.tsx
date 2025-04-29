import React from "react";
import useActivations from "./useActivations";
import { Space, SpaceVertical, Span, Spinner } from "@looker/components";
import MonitoringTable from "./MonitoringTable";

const Monitoring = () => {
  const { data, isFetching } = useActivations({});

  if (isFetching) {
    return (
      <Space around height={"100%"}>
        <Spinner color={"key"} size={60} />
      </Space>
    );
  }

  return (
    <SpaceVertical>
      <Span fontSize={"xlarge"}>
        <Span fontSize={"xlarge"} fontWeight={"bold"}>
          Monitoring
        </Span>
      </Span>
      <SpaceVertical
        style={{ maxHeight: "calc(100vh - 220px)", overflow: "auto" }}
      >
        {data?.length ? <MonitoringTable tableData={data || []} /> : null}
      </SpaceVertical>
    </SpaceVertical>
  );
};

export default Monitoring;
