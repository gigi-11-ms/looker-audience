import { useMutation } from "react-query";
import { createQueryInstance } from "../../utils/queryClient/axios";
import { toast } from "react-toastify";

interface CreateQueryParams {
  audienceId: string;
  actionEndpoint: string;
}

const createQuery = async ({
  audienceId,
  actionEndpoint,
}: CreateQueryParams) => {
  const { data } = await createQueryInstance.post<{ query_id: string }>(
    `/create-query`,
    {
      audience_id: audienceId,
      action_endpoint: actionEndpoint,
    }
  );

  return data;
};

const useCreateQuery = () =>
  useMutation({
    mutationFn: createQuery,
    onError: () => {
      toast.error("Something went wrong");
    },
  });

export default useCreateQuery;
