import React from "react";
import useFolder from "./useFolder";
import AudiencesTable from "./AudiencesTable";
import { AUDIENCES_FOLDER_ID } from "../../constants";
import { Space, SpaceVertical, Span, Spinner } from "@looker/components";

const Audiences = () => {
  const { data: folderData, isLoading: isFolderLoading } =
    useFolder(AUDIENCES_FOLDER_ID);
  const { name, looks } = folderData || {};

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
      <SpaceVertical>
        <Span fontSize={"large"}>Audiences:</Span>
        {looks?.length ? <AudiencesTable tableData={looks} /> : null}
      </SpaceVertical>
    </SpaceVertical>
  );
};

export default Audiences;
