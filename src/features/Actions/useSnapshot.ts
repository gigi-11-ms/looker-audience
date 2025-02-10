import { useQuery } from "react-query";
import axiosInstance from "../../utils/queryClient/axios";

const SNAPSHOT_TABLE_NAME = "looker_query_21";

const fetchSnapshot = async (snapshotId: string | undefined) => {
  const { data } = await axiosInstance.get<{ queryId: string }>(
    "/get_snapshot_data_looker_dia",
    {
      params: {
        snapshot_id: snapshotId,
        table_name: SNAPSHOT_TABLE_NAME,
      },
    }
  );

  return data;
};

const useSnapshot = (snapshotId: string | undefined) => {
  return useQuery({
    queryKey: ["useSnapshot", snapshotId],
    queryFn: () => fetchSnapshot(snapshotId),
    enabled: !!snapshotId,
  });
};

export default useSnapshot;
