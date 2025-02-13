import { useMutation } from "react-query";
import axiosInstance from "../../utils/queryClient/axios";

const saveSnapshot = async (lookId: string) => {
  await axiosInstance.post("/save_snapshot_looker_dia", { look_id: lookId });
};

const useSaveSnapshot = () => useMutation({ mutationFn: saveSnapshot });

export default useSaveSnapshot;
