import {
  Box,
  LkFieldItem,
  LkFieldTree,
  Space,
  SpaceVertical,
  Span,
  Spinner,
  TreeCollection,
} from "@looker/components";
import React from "react";
import useModels from "./useModels";
import InfoBox from "../../components/InfoBox";

const CreateAudience = () => {
  const { data, isLoading } = useModels();

  if (isLoading)
    return (
      <Space around>
        <Spinner />
      </Space>
    );

  return (
    <SpaceVertical>
      <Span fontSize={"xlarge"}>Select Explore</Span>
      <Space align="stretch">
        <Box
          maxHeight={"calc(100vh - 150px)"}
          overflowY={"auto"}
          flex={2}
          p={8}
        >
          <TreeCollection>
            {data?.map(({ label, explores, name }, i) => (
              <LkFieldTree
                label={<strong>{label}</strong>}
                defaultOpen
                key={name}
              >
                {explores?.map(({ name, description }) => (
                  <LkFieldItem
                    detail={<InfoBox description={description} />}
                    style={{ cursor: "pointer" }}
                    key={name}
                    onClick={() => console.log("explore: ", name)}
                  >
                    <Span>{name}</Span>
                  </LkFieldItem>
                ))}
              </LkFieldTree>
            ))}
          </TreeCollection>
        </Box>
        <Box flex={7}>Recently Viewed</Box>
      </Space>
    </SpaceVertical>
  );
};

export default CreateAudience;
