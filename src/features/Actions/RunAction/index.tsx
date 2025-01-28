import { Button, ButtonTransparent, DialogLayout } from "@looker/components";
import React, { FC, useEffect } from "react";
import { closeModal, useModalContext } from "../../../context/ModalContext";
import { GOOGLE_DRIVE_INTEGRATION_ID } from "../../../constants";
import useIntegration from "../useIntegration";
import useIntegrationForm from "../useIntegrationForm";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../../components/FormTextField/FormTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "../../../components/FormSelect/FormSelect";
import getIntegrationFormSchema from "./integrationFormSchema";
import { z } from "zod";

interface RunActionProps {
  lookId: string;
}

type ActionFormSchemaType = z.infer<
  ReturnType<typeof getIntegrationFormSchema>
>;

const RunAction: FC<RunActionProps> = ({ lookId }) => {
  const { dispatch } = useModalContext();
  const { data: integrationData } = useIntegration(GOOGLE_DRIVE_INTEGRATION_ID);
  const { data: integrationFormData, mutate } = useIntegrationForm();

  const methods = useForm<ActionFormSchemaType>({
    resolver: zodResolver(
      getIntegrationFormSchema(integrationFormData?.fields)
    ),
    defaultValues: {
      title: "",
      provider: "",
      formatDataAs: "",
      integrationForm: {},
    },
    mode: "onChange",
  });
  const { handleSubmit, getValues, reset } = methods;

  useEffect(() => {
    mutate(GOOGLE_DRIVE_INTEGRATION_ID, {
      onSuccess: (data) => {
        const { fields } = data;
        const formFields = fields?.reduce((acc, curr) => {
          const { name } = curr;
          return { ...acc, [name || ""]: curr.default || "" };
        }, {});

        reset({ ...getValues(), integrationForm: formFields });
      },
    });
  }, []);

  return (
    <DialogLayout
      header="Run Action"
      footer={
        <>
          <Button
            onClick={() => {
              const integrationFormData = getValues();
              console.log("run", lookId, integrationFormData);
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
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <FormTextField name="title" label="test" />
          <FormSelect
            name="integrationForm.drive"
            label="Drive"
            options={[
              { value: "test", label: "Test" },
              { value: "test2", label: "Test2" },
            ]}
          />
          <FormTextField name="integrationForm.filename" label="File Name" />
          <FormTextField name="integrationForm.folderid" label="Folder Id" />
        </form>
      </FormProvider>
    </DialogLayout>
  );
};

export default RunAction;
