import React, { ChangeEvent, FC } from "react";
import { FloatingLabelField, InputText } from "@looker/components";
import { Controller, useFormContext } from "react-hook-form";

type FormTextFieldType = {
  name: string;
  label?: string;
  disabled?: boolean;
};

const FormTextField: FC<FormTextFieldType> = ({ name, disabled, label }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          {label ? (
            <FloatingLabelField
              validationMessage={{ ...(error ? { type: "error" } : {}) }}
            >
              {label}
            </FloatingLabelField>
          ) : null}
          <InputText
            validationType={error ? "error" : ""}
            value={value}
            onChange={(e: ChangeEvent) =>
              onChange((e.currentTarget as HTMLInputElement).value)
            }
            disabled={disabled}
          />
        </>
      )}
    />
  );
};

export default FormTextField;
