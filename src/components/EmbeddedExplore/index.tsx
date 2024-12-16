import React from "react";
import { Space } from "@looker/components";

interface EmbeddedExploreProps {
  modelName: string;
  exploreName: string;
}

const EmbeddedExplore = ({ modelName, exploreName }: EmbeddedExploreProps) => {
  return (
    <Space flex={1} height={"100%"}>
      <iframe
        src={`https://makingscience.eu.looker.com/embed/explore/${modelName}/${exploreName}`}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </Space>
  );
};

export default EmbeddedExplore;
