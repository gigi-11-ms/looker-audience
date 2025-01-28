import { useContext } from "react";
import { useQuery } from "react-query";
import { ExtensionContext } from "@looker/extension-sdk-react";

const useIntegrations = (integrationHubId: string) => {
  const { core40SDK } = useContext(ExtensionContext);

  return useQuery({
    queryKey: ["useIntegrations", integrationHubId],
    queryFn: () => core40SDK.ok(core40SDK.all_integrations({})),
    enabled: !!integrationHubId,
  });
};

export default useIntegrations;
