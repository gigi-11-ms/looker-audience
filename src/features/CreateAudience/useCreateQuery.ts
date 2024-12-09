import { ExtensionContext } from "@looker/extension-sdk-react";
import { useContext } from "react";
import { useMutation } from "react-query";

const useCreateQuery = () => {
  const { core40SDK } = useContext(ExtensionContext);

  return useMutation({
    mutationFn: ({
      exploreName,
      fields,
      modelName,
    }: {
      fields: string[];
      exploreName: string;
      modelName: string;
    }) =>
      core40SDK.ok(
        core40SDK.create_query({ model: modelName, view: exploreName, fields })
      ),
  });
};

export default useCreateQuery;
