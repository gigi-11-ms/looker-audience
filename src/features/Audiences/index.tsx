import React from "react";
import AudiencesTable from "./AudiencesTable";
import { Space, SpaceVertical, Span, Spinner } from "@looker/components";
import useAudiences from "./useAudiences";

const Audiences = () => {
  const { data, isFetching } = useAudiences();

  if (isFetching) {
    return (
      <Space around height={"100%"}>
        <Spinner color={"rgb(108, 67, 224)"} size={60} />
      </Space>
    );
  }

  return (
    <SpaceVertical>
      <Span fontSize={"xlarge"}>
        <Span fontSize={"xlarge"} fontWeight={"bold"}>
          Audiences
        </Span>
      </Span>
      <SpaceVertical
        style={{ maxHeight: "calc(100vh - 220px)", overflow: "auto" }}
      >
        {data?.length ? <AudiencesTable tableData={data || []} /> : null}
      </SpaceVertical>
    </SpaceVertical>
  );
};

export default Audiences;
