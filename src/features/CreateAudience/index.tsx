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
import { useHistory } from "react-router-dom";

const CreateAudience = () => {
  const { data, isLoading } = useModels();
  const history = useHistory();

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
            {data?.map(({ label, explores, name: modelName }, i) => (
              <LkFieldTree
                label={<strong>{label}</strong>}
                defaultOpen
                key={modelName}
              >
                {explores?.map(({ name, description, label }) => (
                  <LkFieldItem
                    detail={<InfoBox description={description} />}
                    style={{ cursor: "pointer" }}
                    key={name}
                    onClick={() =>
                      history.push(`/audience/create/${modelName}/${name}`)
                    }
                  >
                    <Span>{label}</Span>
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
