import { useQuery } from "react-query";
import { mappingsAxiosInstance } from "../../utils/queryClient/axios";

export interface IMappingsResult {
  endpoint_name: string;
  endpoint_fields: Record<string, string>;
  lookml_model: string;
  lookml_explore: string;
  last_modified: string;
}

const fetchMappings = async () => {
  const { data } = await mappingsAxiosInstance.get<IMappingsResult[]>(
    "/mappings"
  );

  return data;
};

const useMappings = ({
  onSuccess,
}: {
  onSuccess?: (data: IMappingsResult[]) => void;
}) =>
  useQuery({
    queryKey: ["useMappings"],
    queryFn: () => fetchMappings(),
    onSuccess,
  });

export default useMappings;
