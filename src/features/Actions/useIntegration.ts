import { useContext } from "react";
import { useQuery } from "react-query";
import { ExtensionContext } from "@looker/extension-sdk-react";

const useIntegration = (integrationId: string) => {
  const { core40SDK } = useContext(ExtensionContext);

  return useQuery({
    queryKey: ["useIntegration", integrationId],
    queryFn: () => core40SDK.ok(core40SDK.integration(integrationId)),
    enabled: !!integrationId,
  });
};

export default useIntegration;
