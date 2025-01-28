import { useContext } from "react";
import { useMutation } from "react-query";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { IDataActionForm } from "@looker/sdk";

const useIntegrationForm = () => {
  const { core40SDK } = useContext(ExtensionContext);

  return useMutation({
    mutationKey: ["useIntegrationForm"],
    mutationFn: (integrationId: string) =>
      core40SDK.ok(core40SDK.fetch_integration_form(integrationId, {})),
  });
};

export default useIntegrationForm;
