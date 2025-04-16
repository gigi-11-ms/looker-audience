import {
  ButtonTransparent,
  DialogLayout,
  Divider,
  Label,
  Space,
  SpaceVertical,
  Spinner,
} from "@looker/components";
import React, { FC, useCallback, useContext, useEffect } from "react";
import { closeModal, useModalContext } from "../../../context/ModalContext";
import {
  GOOGLE_DRIVE_INTEGRATION_ID,
  LOOKER_INTEGRATION,
} from "../../../constants";
import useIntegration from "../useIntegration";
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
import { ExtensionContext, ExtensionContext40 } from "@looker/extension-sdk-react";

interface RunActionProps {
  title: string;
  audienceId: string;
}

export type ActionFormType = z.infer<
  ReturnType<typeof getIntegrationFormSchema>
>;

const RunAction: FC<RunActionProps> = ({ audienceId, title }) => {
  const { dispatch } = useModalContext();
  const { data: integrationData } = useIntegration(GOOGLE_DRIVE_INTEGRATION_ID);
  const {
    data: integrationFormData,
    mutate,
    isLoading: integrationFormLoading,
  } = useIntegrationForm();

  const {
    extensionSDK,
  } = useContext(ExtensionContext)

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
      provider: "1::google_drive",
      formatDataAs: "json",
      integrationForm: {},
    },
    mode: "onChange",
  });
  const { handleSubmit, getValues, reset } = methods;
  // const { supported_formats: supportedFormats } = integrationData || {};

  useEffect(() => {
    mutate(
      { integrationId: GOOGLE_DRIVE_INTEGRATION_ID },
      {
        onSuccess: (data) => {
          const { fields } = data;
          const formFields = fields?.reduce((acc, curr) => {
            const { name } = curr;
            return { ...acc, [name || ""]: curr.default || "" };
          }, {});

          reset({ ...getValues(), integrationForm: formFields });
        },
      }
    );
  }, []);

  const renderIntegrationForm = useCallback(
    () =>
      integrationFormLoading ? (
        <Spinner />
      ) : integrationFormFields ? (
        <IntegrationForm fields={integrationFormFields} mutate={mutate} />
      ) : null,
    [integrationFormLoading, integrationFormFields]
  );

  const handleRunAction = useCallback(
    ({
      formatDataAs,
      integrationForm,
      provider,
      audienceId,
    }: ActionFormType & { audienceId: string }) => {
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
              },
              {
                onSuccess: async (data) => {
                  const {
                    user: {
                      first_name: name = "",
                      last_name: lastname = "",
                    } = {},
                    id = "",
                    crontab,
                  } = data;

                  const email = await extensionSDK.userAttributeGetItem('email') || ''
                  createActivation(
                    {
                      activationEndpoint: provider,
                      activationName: title,
                      audienceId,
                      creatorName: name,
                      creatorLastname: lastname,
                      queryId,
                      scheduledPlanId: id,
                      schedule: crontab,
                      creatorEmail: email,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Audience Sent!");
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
    []
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
              integrationFormLoading
            }
            loading={
              isActionRunLoading ||
              isCreateActivationLoading ||
              isCreateQueryLoading
            }
            onClick={() => {
              handleSubmit((data) => {
                handleRunAction({ ...data, audienceId });
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
                <FormActionProvider name="provider" />
              </Space>
            </SpaceVertical>
            <Divider />
            <SpaceVertical gap="small">
              <Label fontSize={"medium"}>Google Drive</Label>
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
                <FormFormatData name="formatDataAs" />
              </Space>
            </SpaceVertical>
          </SpaceVertical>
        </form>
      </FormProvider>
    </DialogLayout>
  );
};

export default RunAction;
