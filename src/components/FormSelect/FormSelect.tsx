import React, { FC } from "react";
import { FloatingLabelField, Select, SpaceVertical } from "@looker/components";
import { Controller, useFormContext } from "react-hook-form";

export type FormOptionType = { value: string; label: string };

export type FormSelectFieldType = {
  name: string;
  label?: string;
  disabled?: boolean;
  options: FormOptionType[];
  onChange?: (value: string) => void;
  placeholder?: string;
};

const FormSelect: FC<FormSelectFieldType> = ({
  name,
  disabled,
  label,
  options,
  onChange,
  placeholder,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange: hfOnchange, value },
        fieldState: { error },
      }) => (
        <SpaceVertical gap="xxxsmall">
          {label ? (
            <FloatingLabelField
              validationMessage={{ ...(error ? { type: "error" } : {}) }}
            >
              {label}
            </FloatingLabelField>
          ) : null}
          <Select
            value={value || ''}
            onChange={(value: string) => {
              hfOnchange(value);
              onChange?.(value);
            }}
            disabled={disabled}
            options={options}
            validationType={error ? "error" : ""}
            placeholder={placeholder}
          />
        </SpaceVertical>
      )}
    />
  );
};

export default FormSelect;
