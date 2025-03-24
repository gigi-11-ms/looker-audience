import {
  Button,
  ButtonTransparent,
  DialogLayout,
  Divider,
  Label,
  Space,
  SpaceVertical,
  Spinner,
} from "@looker/components";
import React, { FC, useCallback, useEffect } from "react";
import { closeModal, useModalContext } from "../../../context/ModalContext";
import { GOOGLE_DRIVE_INTEGRATION_ID } from "../../../constants";
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

  const { fields: integrationFormFields } = integrationFormData || {};

  const { mutate: runOneTimeAction, isLoading: isActionRunLoading } =
    useRunOneTimeAction();

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
  const { supported_formats: supportedFormats } = integrationData || {};

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
      // runOneTimeAction(
      //   {
      //     queryId,
      //     lookId,
      //     name: title,
      //     scheduledPlanDestination: [
      //       {
      //         format: formatDataAs,
      //         address: "",
      //         apply_formatting: true,
      //         apply_vis: true,
      //         type: LOOKER_INTEGRATION + provider,
      //         parameters: JSON.stringify(integrationForm),
      //       },
      //     ],
      //   },
      //   {
      //     onSuccess: () => {
      //       toast.success("Audience Sent!");
      //     },
      //     onError: () => {
      //       toast.error("Something went wrong");
      //     },
      //   }
      // );
      console.log({ formatDataAs, integrationForm, provider, audienceId });
    },
    []
  );

  return (
    <DialogLayout
      header="Run Action"
      footer={
        <>
          <Button
            disabled={isActionRunLoading}
            onClick={() => {
              handleSubmit((data) => {
                handleRunAction({ ...data, audienceId });
              })();
            }}
          >
            Run
          </Button>
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
                <FormActionProvider name="provider"/>
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
