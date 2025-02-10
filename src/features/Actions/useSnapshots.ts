import { useQuery } from "react-query";
import axiosInstance from "../../utils/queryClient/axios";

const fetchSnapshots = async (lookId: string) => {
  const { data } = await axiosInstance.get(
    "/get_snapshot_metadata_looker_dia",
    {
      params: {
        look_id: lookId,
      },
    }
  );

  return data;
};

const useSnapshots = (lookId: string) => {
  return useQuery({
    queryKey: ["useSnapshots", lookId],
    queryFn: () => fetchSnapshots(lookId),
    enabled: !!lookId,
  });
};

export default useSnapshots;
