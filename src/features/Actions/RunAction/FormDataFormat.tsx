import { IconButton } from "@looker/components";
import React, { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Drive_Formats, getFormatIcon } from "../../../constants";

type FormFormatDataType = {
  name: string;
};

const FormFormatData: FC<FormFormatDataType> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: formValue } }) => (
        <>
          {Drive_Formats.map((value) => {
            const Icon = getFormatIcon(value);
            const isSelected = formValue === value;
            return (
              <IconButton
                key={value}
                icon={<Icon />}
                onClick={() => {
                  onChange(value);
                }}
                size="large"
                style={{ border: isSelected ? "1px solid blue" : "none" }}
              />
            );
          })}
        </>
      )}
    />
  );
};

export default FormFormatData;
