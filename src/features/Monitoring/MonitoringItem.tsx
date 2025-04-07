import { Button, Card, SpaceVertical, Span } from "@looker/components";
import React, { FC } from "react";
import { IMappingsResult } from "./useMappings";
import FormSelect from "../../components/FormSelect/FormSelect";
import { FormProvider, useForm } from "react-hook-form";

interface MonitoringItemProps {
  endpoint: IMappingsResult;
}

const normalizeEndpointName = (name: string) =>
  name.replaceAll("#", "|").replaceAll("$", ".");

const MonitoringItem: FC<MonitoringItemProps> = ({ endpoint }) => {
  const {
    endpoint_fields: endpointFields,
    last_modified: lastModified,
    lookml_explore: lookmlExplore,
    lookml_model: lookmlModel,
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

  const { handleSubmit } = methods;

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

          const normalizedData = {
            endpointFields: normalizedEndpointFields,
            lookml_model: "some_model",
            lookml_explore: "some_explore",
          };

          console.log(normalizedData, endpoint.endpoint_name);
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
                <FormSelect
                  name={`endpointFields.${key}`}
                  options={[{ value: "valu1", label: "Value1" }]}
                />
              </SpaceVertical>
            ))}
          </Card>
          <Card padding={8} width={"100%"}>
            <SpaceVertical gap="small">
              <Span>Last Modified: {lastModified}</Span>
              <Span>LookML Model: {lookmlModel || "-"}</Span>
              <Span>LookML Explore: {lookmlExplore || "-"}</Span>
            </SpaceVertical>
          </Card>
          <Card padding={8} width={"100%"} alignItems={"start"}>
            <Button type="submit">Save</Button>
          </Card>
        </SpaceVertical>
      </form>
    </FormProvider>
  );
};

export default MonitoringItem;
