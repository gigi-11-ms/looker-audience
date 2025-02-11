import { useQuery } from "react-query";
import axiosInstance from "../../utils/queryClient/axios";

const fetchSnapshot = async (
  snapshotId: string | undefined,
  lookId: string
) => {
  const { data } = await axiosInstance.get<{ queryId: string }>(
    "/get_snapshot_data_looker_dia",
    {
      params: {
        snapshot_id: snapshotId,
        table_name: `looker_query_${lookId}`,
      },
    }
  );

  return data;
};

const useSnapshot = (snapshotId: string | undefined, lookId: string) => {
  return useQuery({
    queryKey: ["useSnapshot", snapshotId],
    queryFn: () => fetchSnapshot(snapshotId, lookId),
    enabled: !!snapshotId,
  });
};

export default useSnapshot;
