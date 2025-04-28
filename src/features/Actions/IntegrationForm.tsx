import { IDataActionForm, IDataActionFormField } from "@looker/sdk";
import React, { FC } from "react";
import generateFormField, {
  getSelectOptions,
} from "../../utils/form/generateFormFields";
import { SpaceVertical } from "@looker/components";
import { FormOptionType } from "../../components/FormSelect/FormSelect";
import { UseMutateFunction } from "react-query";
import { IntegrationFormParams } from "./useIntegrationForm";
import FetchPlsSelect from "./ExceptionFields/FetchPlsSelect";
import LoginCidSelect from "./ExceptionFields/LoginCid";
import CreateOrAppendSelect from "./ExceptionFields/CreateOrAppend";
import MobileDeviceSelect from "./ExceptionFields/MobileDevice";

type IntegrationFormType = {
  fields: IDataActionFormField[];
  mutate?: UseMutateFunction<
    IDataActionForm,
    unknown,
    IntegrationFormParams,
    unknown
  >;
  provider: string;
};

const EXCEPTION_FIELDS = {
  fetchpls: {
    Component: FetchPlsSelect,
  },
  loginCid: {
    Component: LoginCidSelect,
  },
  createOrAppend: {
    Component: CreateOrAppendSelect,
  },
  mobileDevice: {
    Component: MobileDeviceSelect,
  },
};

const IntegrationForm: FC<IntegrationFormType> = ({
  fields,
  mutate,
  provider,
}) => {
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
              name={`integrationForm.${fieldName}`}
              label={fieldLabel}
              options={fieldOptions}
              mutate={mutate}
              provider={provider}
            />
          );
        }

        return generateFormField({ field, preffix: "integrationForm" });
      })}
    </SpaceVertical>
  );
};

export default IntegrationForm;
