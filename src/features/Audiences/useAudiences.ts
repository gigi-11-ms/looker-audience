import { useQuery } from "react-query";
import axiosInstance from "../../utils/queryClient/axios";

export interface IAudiencesResult {
  audience_id: string;
  audience_name: string;
  created_timestamp: string;
  email: string;
  filters: Record<string, unknown>;
  updated_timestamp: string;
  username: string;
}

const fetchAudiences = async () => {
  const { data } = await axiosInstance.get<IAudiencesResult[]>("/audiences");

  return data;
};

const useAudiences = () => {
  return useQuery({
    queryKey: ["useAudiences"],
    queryFn: () => fetchAudiences(),
  });
};

export default useAudiences;
