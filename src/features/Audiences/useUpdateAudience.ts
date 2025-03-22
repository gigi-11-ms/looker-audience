import { useMutation } from "react-query";
import { audiencesInstance } from "../../utils/queryClient/axios";

interface IAudienceUpdateParams {
  id: string;
  name: string;
}

const updateAudience = async ({ id, name }: IAudienceUpdateParams) => {
  await audiencesInstance.patch(`/audiences/${id}`, {
    audience_name: name,
  });
};

const useUpdateAudience = () => useMutation({ mutationFn: updateAudience });

export default useUpdateAudience;
