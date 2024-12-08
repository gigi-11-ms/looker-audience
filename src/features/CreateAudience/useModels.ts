import { ExtensionContext } from "@looker/extension-sdk-react";
import { useContext } from "react";
import { useQuery } from "react-query";

const useModels = () => {
  const { core40SDK } = useContext(ExtensionContext);
  return useQuery({
    queryKey: ["models"],
    queryFn: () => core40SDK.ok(core40SDK.all_lookml_models({})),
    select: (data) =>
      data.filter(
        ({ has_content, explores }) => has_content && explores?.length
      ),
  });
};

export default useModels;
