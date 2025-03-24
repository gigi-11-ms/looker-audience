import { useMutation } from "react-query";
import { audiencesInstance } from "../../utils/queryClient/axios";

interface IAudienceUpdateParams {
  id: string;
  name: string;
  filters: Record<string, unknown>
}

const updateAudience = async ({ id, name, filters }: IAudienceUpdateParams) => {
  await audiencesInstance.patch(`/audiences/${id}`, {
    audience_name: name,
    filters
  });
};

const useUpdateAudience = () => useMutation({ mutationFn: updateAudience });

export default useUpdateAudience;
