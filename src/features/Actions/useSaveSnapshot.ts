import { useMutation } from "react-query";
import axiosInstance from "../../utils/queryClient/axios";

const saveSnapshot = async (lookId: string) => {
  axiosInstance.post("/save_snapshot_looker_dia", { look_id: lookId });
};

const useSaveSnapshot = () => useMutation({ mutationFn: saveSnapshot });

export default useSaveSnapshot;
