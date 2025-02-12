import React, { Fragment } from "react";
import { IDataActionFormField, IDataActionFormSelectOption } from "@looker/sdk";
import FormTextField from "../../components/FormTextField/FormTextField";
import FormSelect, {
  FormOptionType,
} from "../../components/FormSelect/FormSelect";
import { Button } from "@looker/components";

enum FieldType {
  SELECT = "select",
  STRING = "string",
  LOGIN = "oauth_link",
}

type GenerateFormFieldType = {
  field: IDataActionFormField;
  preffix?: string;
};

export const getSelectOptions = (option: IDataActionFormSelectOption) => {
  const { name, label } = option;

  const value = name || "";
  const fieldLabel = label || "";

  return { value, label: fieldLabel };
};

const generateFormField = ({ field, preffix }: GenerateFormFieldType) => {
  const { type, name, label, options } = field;

  const fieldName = `${preffix}.${name || ""}`;
  const fieldLabel = label || "";
  const fieldOptions: FormOptionType[] = (options || []).map(getSelectOptions);

  switch (type as FieldType) {
    case FieldType.STRING: {
      return (
        <FormTextField key={fieldName} name={fieldName} label={fieldLabel} />
      );
    }
    case FieldType.SELECT: {
      return (
        <FormSelect
          key={fieldName}
          name={fieldName}
          options={fieldOptions}
          label={fieldLabel}
        />
      );
    }
    case FieldType.LOGIN: {
      return (
        <Fragment key={fieldName}>
          <span>Please login to your Google account to continue.</span>
          <Button key={fieldName} onClick={() => console.log("handle login")}>
            {fieldLabel}
          </Button>
        </Fragment>
      );
    }
    default: {
      return null;
    }
  }
};

export default generateFormField;
