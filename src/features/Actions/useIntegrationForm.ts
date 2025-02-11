import { useContext } from "react";
import { useMutation } from "react-query";
import { ExtensionContext } from "@looker/extension-sdk-react";

export type IntegrationFormParams = {
  integrationId: string;
  body?: object;
};

const useIntegrationForm = () => {
  const { core40SDK } = useContext(ExtensionContext);

  return useMutation({
    mutationKey: ["useIntegrationForm"],
    mutationFn: ({ integrationId, body = {} }: IntegrationFormParams) =>
      core40SDK.ok(core40SDK.fetch_integration_form(integrationId, body)),
  });
};

export default useIntegrationForm;
