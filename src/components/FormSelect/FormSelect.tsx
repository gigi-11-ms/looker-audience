import React, { FC } from "react";
import { FloatingLabelField, Select } from "@looker/components";
import { Controller, useFormContext } from "react-hook-form";

type FormOptionType = { value: string; label: string };

type FormSelectFieldType = {
  name: string;
  label?: string;
  disabled?: boolean;
  options: FormOptionType[];
};

const FormSelect: FC<FormSelectFieldType> = ({
  name,
  disabled,
  label,
  options,
}) => {
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
          <Select
            value={value}
            onChange={onChange}
            disabled={disabled}
            options={options}
            validationType={error ? "error" : ""}
          />
        </>
      )}
    />
  );
};

export default FormSelect;
