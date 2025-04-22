import { useMutation } from "react-query";
import {
  activationInstance,
} from "../../utils/queryClient/axios";
import { toast } from "react-toastify";

interface CreateActivationParams {
  activationEndpoint: string;
  queryId: string;
  audienceId: string;
  scheduledPlanId: string;
  activationName: string;
  creatorName: string;
  creatorLastname: string;
  creatorEmail: string;
  schedule?: string | null;
}

const createActivation = async ({
  activationEndpoint,
  activationName,
  audienceId,
  creatorEmail,
  creatorLastname,
  creatorName,
  queryId,
  schedule,
  scheduledPlanId,
}: CreateActivationParams) => {
  const { data } = await activationInstance.post(`/activations`, {
    activation_endpoint: activationEndpoint,
    query_id: queryId,
    audience_id: audienceId,
    scheduled_plan_id: scheduledPlanId,
    activation_name: activationName,
    creator_name: creatorName,
    creator_lastname: creatorLastname,
    creator_email: creatorEmail,
    schedule: schedule,
  });

  return data;
};

const useCreateActivation = () =>
  useMutation({
    mutationFn: createActivation,
    onError: () => {
      toast.error("Something went wrong");
    },
  });

export default useCreateActivation;
