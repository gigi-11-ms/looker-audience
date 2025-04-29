import {
  ButtonTransparent,
  DialogLayout,
  Divider,
  FieldCheckbox,
  Label,
  Space,
  SpaceVertical,
  Span,
  Spinner,
} from "@looker/components";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { closeModal, useModalContext } from "../../../context/ModalContext";
import {
  FACEBOOK_INTEGRATION_ID,
  getProviderLabel,
  LOOKER_INTEGRATION,
  ProviderType,
} from "../../../constants";
import useIntegrationForm from "../useIntegrationForm";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../../components/FormTextField/FormTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import getIntegrationFormSchema from "./integrationFormSchema";
import { z } from "zod";
import IntegrationForm from "../IntegrationForm";
import useRunOneTimeAction from "../useRunOneTimeAction";
import FormFormatData from "./FormDataFormat";
import FormActionProvider from "./FormActionProvider";
import useCreateQuery from "../useCreateQuery";
import { toast } from "react-toastify";
import LoadingButton from "../../../components/LoadingButton";
import useCreateActivation from "../useCreateActivation";
import { ExtensionContext } from "@looker/extension-sdk-react";
import { SchedulePicker } from "../Schedule/Schedule";

interface RunActionProps {
  title: string;
  audienceId: string;
}

export type ActionFormType = z.infer<
  ReturnType<typeof getIntegrationFormSchema>
>;

const RunAction: FC<RunActionProps> = ({ audienceId, title }) => {
  const { dispatch } = useModalContext();
  const [canRunAction, setCanRunAction] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [provider, setProvider] = useState<ProviderType>(
    () => FACEBOOK_INTEGRATION_ID
  );
  const {
    data: integrationFormData,
    mutate,
    isLoading: integrationFormLoading,
  } = useIntegrationForm();

  const { extensionSDK } = useContext(ExtensionContext);

  const { fields: integrationFormFields } = integrationFormData || {};

  const { mutate: runOneTimeAction, isLoading: isActionRunLoading } =
    useRunOneTimeAction();

  const { mutate: createQuery, isLoading: isCreateQueryLoading } =
    useCreateQuery();

  const { mutate: createActivation, isLoading: isCreateActivationLoading } =
    useCreateActivation();

  const methods = useForm<ActionFormType>({
    resolver: zodResolver(getIntegrationFormSchema(integrationFormFields)),
    defaultValues: {
      title,
      formatDataAs: "",
      integrationForm: {},
      crontab: "00 1 * * 1-5",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    getValues,
    reset,
    formState: {
      errors: { formatDataAs: { message: formatError } = {} },
    },
  } = methods;

  useEffect(() => {
    mutate(
      { integrationId: provider },
      {
        onSuccess: (data) => {
          const { fields } = data;
          const formFields = fields?.reduce((acc, curr) => {
            const { name } = curr;
            return { ...acc, [name || ""]: curr.default || "" };
          }, {} as Record<string, string>);

          if (formFields && !Object.hasOwn(formFields, "login")) {
            setCanRunAction(true);

            reset({ ...getValues(), integrationForm: formFields });
            return;
          }

          setCanRunAction(false);
        },
      }
    );
  }, [provider]);

  const renderIntegrationForm = useCallback(
    () =>
      integrationFormLoading ? (
        <Spinner />
      ) : integrationFormFields ? (
        <IntegrationForm
          fields={integrationFormFields}
          mutate={mutate}
          provider={provider}
        />
      ) : null,
    [integrationFormLoading, integrationFormFields, provider]
  );

  const handleRunAction = useCallback(
    ({
      formatDataAs,
      integrationForm,
      provider,
      audienceId,
      crontab,
    }: ActionFormType & { audienceId: string; provider: ProviderType }) => {
      createQuery(
        { audienceId, actionEndpoint: provider },
        {
          onSuccess: ({ query_id: queryId }) =>
            runOneTimeAction(
              {
                queryId,
                name: title,
                scheduledPlanDestination: [
                  {
                    format: formatDataAs,
                    address: "",
                    apply_formatting: true,
                    apply_vis: true,
                    type: LOOKER_INTEGRATION + provider,
                    parameters: JSON.stringify(integrationForm),
                  },
                ],
                crontab: schedule ? crontab : "",
              },
              {
                onSuccess: async (data) => {
                  const {
                    user: {
                      first_name: name = "",
                      last_name: lastname = "",
                    } = {},
                    id = "",
                  } = data;

                  const email =
                    (await extensionSDK.userAttributeGetItem("email")) || "";
                  createActivation(
                    {
                      activationEndpoint: provider,
                      activationName: title,
                      audienceId,
                      creatorName: name,
                      creatorLastname: lastname,
                      queryId,
                      scheduledPlanId: id,
                      schedule: schedule ? crontab : "",
                      creatorEmail: email,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Audience Sent!");
                        closeModal(dispatch);
                      },
                    }
                  );
                },
                onError: () => {
                  toast.error("Something went wrong");
                },
              }
            ),
        }
      );
    },
    [schedule]
  );

  return (
    <DialogLayout
      header="Run Action"
      footer={
        <>
          <LoadingButton
            disabled={
              isActionRunLoading ||
              isCreateActivationLoading ||
              isCreateQueryLoading ||
              integrationFormLoading ||
              !canRunAction
            }
            loading={
              isActionRunLoading ||
              isCreateActivationLoading ||
              isCreateQueryLoading
            }
            onClick={() => {
              handleSubmit((data) => {
                handleRunAction({ ...data, audienceId, provider });
              })();
            }}
          >
            Run
          </LoadingButton>
          <ButtonTransparent
            color="neutral"
            onClick={() => closeModal(dispatch)}
          >
            Close
          </ButtonTransparent>
        </>
      }
    >
      <FormProvider {...methods}>
        <form>
          <SpaceVertical gap="medium">
            <FormTextField name="title" label="Give your schedule a name." />
            <Divider />
            <SpaceVertical gap="small">
              <Label fontSize={"medium"}>Where should this data go?</Label>
              <Space
                gap={"xxlarge"}
                flexWrap={"wrap"}
                style={{ rowGap: "20px" }}
                align={"start"}
              >
                <FormActionProvider
                  onChange={setProvider}
                  selectedValue={provider}
                />
              </Space>
            </SpaceVertical>
            <Divider />
            <SpaceVertical gap="small">
              <Label fontSize={"medium"}>{getProviderLabel(provider)}</Label>
              {renderIntegrationForm()}
            </SpaceVertical>
            <Divider />
            <SpaceVertical>
              <Label fontSize={"medium"}>Format Data as</Label>
              <Space
                gap={"xxlarge"}
                flexWrap={"wrap"}
                style={{ rowGap: "20px" }}
                align={"start"}
              >
                <FormFormatData
                  name="formatDataAs"
                  selectedProvider={provider}
                />
              </Space>
              {formatError ? <Span color="red">{formatError}</Span> : null}
            </SpaceVertical>
            <Divider />
            <SpaceVertical>
              <Space>
                <Label fontSize={"medium"}>Schedule</Label>
                <FieldCheckbox
                  label={"Add Schedule"}
                  checked={schedule}
                  onChange={(e) => {
                    setSchedule(e.target.checked);
                  }}
                />
              </Space>
              {schedule && <SchedulePicker name="crontab" />}
            </SpaceVertical>
          </SpaceVertical>
        </form>
      </FormProvider>
    </DialogLayout>
  );
};

export default RunAction;
