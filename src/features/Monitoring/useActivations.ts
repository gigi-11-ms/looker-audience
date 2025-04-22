import { useQuery } from "react-query";
import { activationInstance } from "../../utils/queryClient/axios";

export interface IActivationsResult {
  activation_endpoint: string;
  query_id: string;
  audience_id: string;
  activation_name: string;
  creator_name: string;
  creator_lastname: string;
  creator_email: string;
}

const fetchActivations = async () => {
  const { data } = await activationInstance.get<IActivationsResult[]>(
    "/activations"
  );

  return data;
};

const useActivations = ({
  onSuccess,
}: {
  onSuccess?: (data: IActivationsResult[]) => void;
}) =>
  useQuery({
    queryKey: ["useActivations"],
    queryFn: () => fetchActivations(),
    onSuccess,
  });

export default useActivations;
