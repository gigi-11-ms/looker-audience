import { useMutation } from "react-query";
import { mappingsAxiosInstance } from "../../utils/queryClient/axios";

interface IMappingUpdateParams {
  endpointFields: Record<string, string>;
  lookml_model: string;
  lookml_explore: string;
  endpointName: string;
}

const updateMapping = async ({
  endpointName,
  endpointFields,
  ...rest
}: IMappingUpdateParams) => {
  await mappingsAxiosInstance.patch(`/mappings/${endpointName}`, {
    endpoint_fields: endpointFields,
    ...rest,
  });
};

const useUpdateMapping = () => useMutation({ mutationFn: updateMapping });

export default useUpdateMapping;
