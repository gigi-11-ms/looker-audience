import {
  Button,
  ButtonTransparent,
  DialogLayout,
  Space,
  SpaceVertical,
  Spinner,
} from "@looker/components";
import React, { FC, useCallback, useEffect } from "react";
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

interface RunActionProps {
  lookId: string;
  title: string;
}

export type ActionFormType = z.infer<
  ReturnType<typeof getIntegrationFormSchema>
>;

const RunAction: FC<RunActionProps> = ({ lookId, title }) => {
  const { dispatch } = useModalContext();
  const { data: integrationData } = useIntegration(GOOGLE_DRIVE_INTEGRATION_ID);
  const {
    data: integrationFormData,
    mutate,
    isLoading: integrationFormLoading,
  } = useIntegrationForm();
  const { mutate: runOneTimeAction } = useRunOneTimeAction();

  const { fields: integrationFormFields } = integrationFormData || {};

  const methods = useForm<ActionFormType>({
    resolver: zodResolver(getIntegrationFormSchema(integrationFormFields)),
    defaultValues: {
      title,
      provider: "1::google_drive", // temp
      formatDataAs: "json", // temp
      integrationForm: {},
    },
    mode: "onChange",
  });
  const { handleSubmit, getValues, reset } = methods;

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

  return (
    <DialogLayout
      header="Run Action"
      footer={
        <>
          <Button
            onClick={() => {
              handleSubmit((data) => {
                const { title, integrationForm, formatDataAs, provider } = data;
                runOneTimeAction({
                  lookId,
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
                });
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
          <SpaceVertical gap="small">
            <FormTextField name="title" label="Give your schedule a name." />
            {renderIntegrationForm()}
          </SpaceVertical>
        </form>
      </FormProvider>
    </DialogLayout>
  );
};

export default RunAction;
