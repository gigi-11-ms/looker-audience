import { useQuery } from "react-query";
import axiosInstance from "../../utils/queryClient/axios";

interface ISnapshotsResult {
  created_at: string;
  look_id: number;
  query_id: number;
  results_table_name: string;
  row_count: number;
  snapshot_id: string;
  status: string;
}

const fetchSnapshots = async (lookId: string) => {
  const { data } = await axiosInstance.get<{ metadata: ISnapshotsResult[] }>(
    "/get_snapshot_metadata_looker_dia",
    {
      params: {
        look_id: lookId,
      },
    }
  );

  return data.metadata;
};

const useSnapshots = (lookId: string) => {
  return useQuery({
    queryKey: ["useSnapshots", lookId],
    queryFn: () => fetchSnapshots(lookId),
    enabled: !!lookId,
  });
};

export default useSnapshots;
