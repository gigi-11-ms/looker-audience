import React from "react";
import { IDataActionFormField, IDataActionFormSelectOption } from "@looker/sdk";
import FormTextField from "../../components/FormTextField/FormTextField";
import FormSelect, {
  FormOptionType,
} from "../../components/FormSelect/FormSelect";
import { Button, Link, SpaceVertical } from "@looker/components";

enum FieldType {
  SELECT = "select",
  STRING = "string",
  LOGIN = "oauth_link",
  LOGIN_GOOGLE = "oauth_link_google",
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
  const { type, name, label, options, description, oauth_url } = field;

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
    case FieldType.LOGIN:
    case FieldType.LOGIN_GOOGLE: {
      return (
        <SpaceVertical
          gap="medium"
          align={"center"}
          key={fieldName}
          textAlign={"center"}
        >
          <span>{description}</span>
          <Link
            href={oauth_url || ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            {fieldLabel}
          </Link>
        </SpaceVertical>
      );
    }
    default: {
      return null;
    }
  }
};

export default generateFormField;
