import React from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../../templates/PageTemplate";
import EmbeddedExplore from "../../components/EmbeddedExplore";

const CreateAudienceExplorePage = () => {
  const { exploreName = "", modelName = "" } = useParams<{
    exploreName?: string;
    modelName?: string;
  }>();
  return (
    <PageTemplate>
      <EmbeddedExplore exploreName={exploreName} modelName={modelName} />
    </PageTemplate>
  );
};

export default CreateAudienceExplorePage;
