import {
  Box,
  DialogLayout,
  Label,
  Space,
  SpaceVertical,
  TextArea,
} from "@looker/components";
import React, { FC } from "react";
import FormTextField from "../../components/FormTextField/FormTextField";
import { Controller, FormProvider, useForm } from "react-hook-form";
import useUpdateAudience from "./useUpdateAudience";
import LoadingButton from "../../components/LoadingButton";
import { closeModal, useModalContext } from "../../context/ModalContext";
import queryClient from "../../utils/queryClient";
import schema from "./EditAudience.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditAudienceProps {
  id: string;
  title: string;
  filters: Record<string, unknown>;
}

export type EditAudienceFormType = z.infer<typeof schema>;

const EditAudience: FC<EditAudienceProps> = ({ id, title, filters }) => {
  const jsonFilters = JSON.stringify(filters, null, 2);

  const { mutate, isLoading } = useUpdateAudience();
  const { dispatch } = useModalContext();

  const methods = useForm<EditAudienceFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title,
      filters: jsonFilters,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = methods;

  return (
    <DialogLayout
      header="Edit Audience"
      footer={
        <Space gap="small">
          <Space gap="small">
            <LoadingButton
              onClick={() => {
                handleSubmit(({ title, filters }) => {
                  mutate(
                    { id, name: title, filters: JSON.parse(filters) },
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
          <FormTextField name="title" label="Title" />
          <SpaceVertical gap="small">
            <Label>Filters</Label>
            <Controller
              name="filters"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  id="jsonInput"
                  placeholder="Enter your JSON here"
                  rows={6}
                />
              )}
            />
            {errors.filters && (
              <p style={{ color: "red" }}>{errors.filters.message}</p>
            )}
          </SpaceVertical>
        </SpaceVertical>
      </FormProvider>
    </DialogLayout>
  );
};

export default EditAudience;
