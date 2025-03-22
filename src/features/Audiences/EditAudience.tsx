import {
  Button,
  DialogLayout,
  Space,
  SpaceVertical,
  TextArea,
} from "@looker/components";
import React, { FC } from "react";
import FormTextField from "../../components/FormTextField/FormTextField";
import { FormProvider, useForm } from "react-hook-form";
import useUpdateAudience from "./useUpdateAudience";
import LoadingButton from "../../components/LoadingButton";
import { closeModal, useModalContext } from "../../context/ModalContext";
import queryClient from "../../utils/queryClient";

interface EditAudienceProps {
  id: string;
  title: string;
  filters: Record<string, unknown>;
}

const EditAudience: FC<EditAudienceProps> = ({ id, title, filters }) => {
  const jsonFilters = JSON.stringify(filters, null, 2);

  const { mutate, isLoading } = useUpdateAudience();
  const { dispatch } = useModalContext();

  const methods = useForm({
    defaultValues: {
      title,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  return (
    <DialogLayout
      header="Select snapshot to use or run action with latest data"
      footer={
        <Space gap="small">
          <Space gap="small">
            <LoadingButton
              onClick={() => {
                handleSubmit(({ title }) => {
                  mutate(
                    { id, name: title },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["useAudiences"],
                        });
                        closeModal(dispatch);
                      },
                    }
                  );
                })();
              }}
              loading={isLoading}
              disabled={!isDirty || isLoading}
            >
              Update Audience
            </LoadingButton>
          </Space>
        </Space>
      }
    >
      <FormProvider {...methods}>
        <SpaceVertical gap="small">
          <FormTextField name="title" />
          <TextArea
            value={jsonFilters}
            resize
            placeholder="Filters"
            rows={10}
            disabled
          />
        </SpaceVertical>
      </FormProvider>
    </DialogLayout>
  );
};

export default EditAudience;
