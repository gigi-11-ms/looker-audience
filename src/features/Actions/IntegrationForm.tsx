import { IDataActionForm, IDataActionFormField } from "@looker/sdk";
import React, { FC } from "react";
import generateFormField, {
  getSelectOptions,
} from "../../utils/form/generateFormFields";
import { SpaceVertical } from "@looker/components";
import { FormOptionType } from "../../components/FormSelect/FormSelect";
import { UseMutateFunction } from "react-query";
import { IntegrationMutationParams } from "./useIntegrationForm";
import FetchPlsSelect from "./RunAction/FetchPlsSelect";

type IntegrationFormType = {
  fields: IDataActionFormField[];
  mutate?: UseMutateFunction<
    IDataActionForm,
    unknown,
    IntegrationMutationParams,
    unknown
  >;
};

const EXCEPTION_FIELDS = {
  fetchpls: {
    Component: FetchPlsSelect,
  },
};

const IntegrationForm: FC<IntegrationFormType> = ({ fields, mutate }) => {
  return (
    <SpaceVertical gap={"medium"}>
      {fields.map((field) => {
        const { name, options, label } = field;

        const fieldName = name || "";
        const fieldLabel = label || "";
        const fieldOptions: FormOptionType[] = (options || []).map(
          getSelectOptions
        );

        const { Component } =
          EXCEPTION_FIELDS[field.name as keyof typeof EXCEPTION_FIELDS] || {};

        if (Component) {
          return (
            <Component
              key={fieldName}
              name={fieldName}
              label={fieldLabel}
              options={fieldOptions}
              mutate={mutate}
            />
          );
        }

        return generateFormField({ field, preffix: "integrationForm" });
      })}
    </SpaceVertical>
  );
};

export default IntegrationForm;
