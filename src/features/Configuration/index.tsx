import React, { useMemo, useState } from "react";
import { Tabs2 as Tabs, Tab2 as Tab, Spinner, Space } from "@looker/components";
import useMappings from "./useMappings";
import ConfigurationItem from "./ConfigurationItem";
import useExplore from "./useExplore";
import { EXPLORE, LOOKML_MODEL } from "../../constants";

export interface IField {
  value: string;
  label: string;
}

const Configuration = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const { data = [], isLoading } = useMappings({
    onSuccess: (data) => {
      if (!activeTab) setActiveTab(data[0].endpoint_name);
    },
  });

  const {
    data: { fields: { dimensions } = {}, view_name: viewName } = {},
    isLoading: isExploreLoading,
  } = useExplore({
    exploreName: EXPLORE,
    modelName: LOOKML_MODEL,
  });

  const fields = useMemo<IField[]>(
    () =>
      dimensions?.map(({ name = "other", label = "Other" }) => ({
        value: `${name}.${viewName}`,
        label,
      })) || [],
    [dimensions, viewName]
  );

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  if (isLoading || isExploreLoading)
    return (
      <Space around height={"100%"}>
        <Spinner color={"rgb(108, 67, 224)"} size={60} />
      </Space>
    );

  return (
    <div
      style={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Tabs tabId={activeTab} onTabChange={handleTabChange}>
        {data.map((endpoint) => (
          <Tab
            key={endpoint.endpoint_name}
            id={endpoint.endpoint_name}
            label={endpoint.endpoint_name}
          >
            <ConfigurationItem
              key={endpoint.endpoint_name}
              endpoint={endpoint}
              fields={fields}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Configuration;
