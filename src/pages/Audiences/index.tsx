import React, { useContext, FC } from "react";
import { Space, Span } from "@looker/components";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { useQuery } from "react-query";
import PageTemplate from "../../templates/PageTemplate";

const Audiences: FC = () => {
  const { core40SDK } = useContext(ExtensionContext);
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => core40SDK.ok(core40SDK.me()),
  });

  return (
    <PageTemplate>
      <Space around>
        <Span fontSize="xxxxxlarge">{data?.display_name}</Span>
      </Space>
    </PageTemplate>
  );
};

export default Audiences;
