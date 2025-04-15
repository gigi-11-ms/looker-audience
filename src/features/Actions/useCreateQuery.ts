import { useMutation } from "react-query";
import { createQueryInstance } from "../../utils/queryClient/axios";
import { toast } from "react-toastify";

interface CreateQueryParams {
  audienceId: string;
  actionEndpoint: string;
}

const createQuery = ({ audienceId, actionEndpoint }: CreateQueryParams) =>
    createQueryInstance.post(`/create-query`, {
    audience_id: audienceId,
    action_endpoint: actionEndpoint,
  });

const useCreateQuery = () =>
  useMutation({
    mutationFn: createQuery,
    onError: () => {
      toast.error("Something went wrong");
    },
  });

export default useCreateQuery;
