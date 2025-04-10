import { useQuery } from "react-query";
import { useContext } from "react";
import { ExtensionContext } from "@looker/extension-sdk-react";

interface IExploreParams {
  modelName: string;
  exploreName: string;
}

const useExplore = ({ modelName, exploreName }: IExploreParams) => {
  const { core40SDK } = useContext(ExtensionContext);
  return useQuery({
    queryKey: ["useExplore"],
    queryFn: () =>
      core40SDK.ok(core40SDK.lookml_model_explore(modelName, exploreName)),
    enabled: !!(modelName && exploreName)
  });
};

export default useExplore;
