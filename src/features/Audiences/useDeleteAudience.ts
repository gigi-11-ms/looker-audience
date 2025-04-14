import { useMutation } from "react-query";
import axiosInstance from "../../utils/queryClient/axios";
import { toast } from "react-toastify";
import queryClient from "../../utils/queryClient";

const deleteAudience = (audienceId: string) =>
  axiosInstance.delete(`/audiences/${audienceId}`);

const useDeleteAudience = () =>
  useMutation({
    mutationFn: deleteAudience,
    onMutate: () => {
      toast.info("Deleting Audience");
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Audience deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["useAudiences"] });
    },
    onError: () => {
      toast.dismiss()
      toast.error("Something went wrong");
    },
  });

export default useDeleteAudience;
