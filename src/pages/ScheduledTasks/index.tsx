import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Space, Span } from "@looker/components";

const ScheduledTasks = () => {
  return (
    <PageTemplate>
      <Space around>
        <Span fontSize="xxxxxlarge">Scheduled Tasks</Span>
      </Space>
    </PageTemplate>
  );
};

export default ScheduledTasks;
