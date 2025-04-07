import React, { useState } from "react";
import {
  Tabs2 as Tabs,
  Tab2 as Tab,
  Card,
  Select,
  Span,
  Spinner,
  SpaceVertical,
  Space,
} from "@looker/components";
import useMappings from "./useMappings";
import MonitoringItem from "./MonitoringItem";

const Monitoring = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const { data = [], isLoading } = useMappings({
    onSuccess: (data) => setActiveTab(data[0].endpoint_name),
  });

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  if (isLoading)
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
            <MonitoringItem key={endpoint.endpoint_name} endpoint={endpoint} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Monitoring;
