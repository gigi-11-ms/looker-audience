import React from "react";
// import CreateAudience from "../../features/CreateAudience";
import PageTemplate from "../../templates/PageTemplate";
import EmbeddedDashboard from "../../components/EmbeddedDashboard";

const CreateAudiencePage = () => (
  <PageTemplate>
    {/* <CreateAudience /> */}
    <EmbeddedDashboard dashboardId="45" />
  </PageTemplate>
);

export default CreateAudiencePage;
