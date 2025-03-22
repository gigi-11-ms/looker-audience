import React from "react";
import useFolder from "./useFolder";
import AudiencesTable from "./AudiencesTable";
import { AUDIENCES_FOLDER_ID } from "../../constants";
import { Space, SpaceVertical, Span, Spinner } from "@looker/components";
import useAudiences from "./useAudiences";

const Audiences = () => {
  const { data: folderData, isLoading: isFolderLoading } =
    useFolder(AUDIENCES_FOLDER_ID);
  const { name, looks } = folderData || {};

  const { data } = useAudiences();

  console.log(data);

  if (isFolderLoading) {
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
          Folder:
        </Span>{" "}
        {name}
      </Span>
      <SpaceVertical
        style={{ maxHeight: "calc(100vh - 220px)", overflow: "auto" }}
      >
        <Span fontSize={"large"}>Audiences:</Span>
        {looks?.length ? <AudiencesTable tableData={looks} /> : null}
      </SpaceVertical>
    </SpaceVertical>
  );
};

export default Audiences;
