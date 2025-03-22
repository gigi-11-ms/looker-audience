import { useQuery } from "react-query";
import { audiencesInstance } from "../../utils/queryClient/axios";

const fetchAudiences = async () => {
  const { data } = await audiencesInstance.get("/audiences");

  return data;
};

const useAudiences = () => {
  return useQuery({
    queryKey: ["useAudiences"],
    queryFn: () => fetchAudiences(),
  });
};

export default useAudiences;
