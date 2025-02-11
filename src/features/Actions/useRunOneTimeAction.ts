import { useContext } from "react";
import { useMutation } from "react-query";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { IScheduledPlanDestination } from "@looker/sdk";

export type IntegrationMutationParams = {
  name: string;
  lookId?: string;
  queryId?: string;
  scheduledPlanDestination: IScheduledPlanDestination[];
};

const useRunOneTimeAction = () => {
  const { core40SDK } = useContext(ExtensionContext);

  return useMutation({
    mutationFn: ({
      name,
      scheduledPlanDestination,
      lookId,
      queryId,
    }: IntegrationMutationParams) =>
      core40SDK.ok(
        core40SDK.scheduled_plan_run_once({
          name,
          ...(lookId && !queryId ? { look_id: lookId } : {}),
          ...(queryId ? { query_id: queryId } : {}),
          send_all_results: false,
          require_change: false,
          require_no_results: false,
          require_results: false,
          scheduled_plan_destination: scheduledPlanDestination,
        })
      ),
  });
};

export default useRunOneTimeAction;
