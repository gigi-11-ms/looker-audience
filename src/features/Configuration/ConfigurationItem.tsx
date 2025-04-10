import { Card, Space, SpaceVertical, Span } from "@looker/components";
import React, { FC } from "react";
import { IMappingsResult } from "./useMappings";
import FormSelect from "../../components/FormSelect/FormSelect";
import { FormProvider, useForm } from "react-hook-form";
import { IField } from ".";
import { EXPLORE, LOOKML_MODEL } from "../../constants";
import useUpdateMapping, { IMappingUpdateParams } from "./useUpdateMapping";
import { toast } from "react-toastify";
import queryClient from "../../utils/queryClient";
import LoadingButton from "../../components/LoadingButton";

interface ConfigurationItemProps {
  endpoint: IMappingsResult;
  fields: IField[];
}

const normalizeEndpointName = (name: string) =>
  name.replaceAll("#", "|").replaceAll("$", ".");

const ConfigurationItem: FC<ConfigurationItemProps> = ({
  endpoint,
  fields,
}) => {
  const {
    endpoint_fields: endpointFields,
    last_modified: lastModified,
    lookml_explore: lookmlExplore,
    lookml_model: lookmlModel,
    endpoint_name: endpointName,
  } = endpoint;

  const mappedEndpointFields = Object.fromEntries(
    Object.entries(endpointFields).map(([key, value]) => [
      key.replaceAll("|", "#").replaceAll(".", "$"),
      value,
    ])
  );
  const endpointFieldEntries = Object.entries(mappedEndpointFields);

  const methods = useForm({
    defaultValues: {
      endpointFields: mappedEndpointFields,
    },
  });

  const { mutate: updateMappings, isLoading: isUpdateMappingsLoading } =
    useUpdateMapping();

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(({ endpointFields }) => {
          const normalizedEndpointFields = Object.fromEntries(
            Object.entries(endpointFields).map(([key, value]) => [
              normalizeEndpointName(key),
              value,
            ])
          );

          const normalizedData: IMappingUpdateParams = {
            endpointName,
            endpointFields: normalizedEndpointFields,
            lookml_model: LOOKML_MODEL,
            lookml_explore: EXPLORE,
          };

          updateMappings(normalizedData, {
            onSuccess: () => {
              toast.success("Mappings updated");
              queryClient.invalidateQueries({ queryKey: ["useMappings"] });
            },
            onError: () => {
              toast.error("Something went wrong");
            },
          });
        })}
      >
        <SpaceVertical gap="large">
          <Card
            padding={8}
            width={"100%"}
            maxHeight={"55vh"}
            overflow={"auto"}
            style={{ gap: 8 }}
          >
            {endpointFieldEntries.map(([key]) => (
              <SpaceVertical gap="small" key={key}>
                <Span>{normalizeEndpointName(key)}</Span>
                <FormSelect name={`endpointFields.${key}`} options={fields} />
              </SpaceVertical>
            ))}
          </Card>
          <SpaceVertical gap="small">
            <Span>Last Modified: {lastModified}</Span>
            <Span>LookML Model: {lookmlModel || "-"}</Span>
            <Span>LookML Explore: {lookmlExplore || "-"}</Span>
          </SpaceVertical>
          <Space padding={8} width={"100%"} align={"start"}>
            <LoadingButton
              loading={isUpdateMappingsLoading}
              type="submit"
              disabled={isUpdateMappingsLoading || !isDirty}
            >
              Save
            </LoadingButton>
          </Space>
        </SpaceVertical>
      </form>
    </FormProvider>
  );
};

export default ConfigurationItem;
