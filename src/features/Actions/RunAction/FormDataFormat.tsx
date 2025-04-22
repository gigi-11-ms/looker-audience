import React, { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FORMATS_MAP,
  getFormatIconSrc,
  getFormatLabel,
  ProviderType,
} from "../../../constants";
import { SpaceVertical, Span } from "@looker/components";

type FormFormatDataType = {
  name: string;
  selectedProvider: ProviderType;
};

const FormFormatData: FC<FormFormatDataType> = ({ name, selectedProvider }) => {
  const { control } = useFormContext();
  const formats = FORMATS_MAP[selectedProvider];

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value: formValue },
        fieldState: { error: { message } = {} },
      }) => (
        <>
          {formats.map((value) => {
            const iconSrc = getFormatIconSrc(value);
            const formatLabel = getFormatLabel(value);
            const isSelected = formValue === value;
            return (
              <SpaceVertical
                gap="small"
                flex={0}
                key={value}
                onClick={() => onChange(value)}
                width={"fit-content"}
                align="center"
                style={{
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    height: "50px",
                    width: "50px",
                    border: `solid 2px ${isSelected ? "#0e88f1" : "#e4e5e6"}`,
                    borderRadius: "50%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "55%",
                    backgroundImage: `url(${iconSrc})`,
                    marginInline: "5px",
                  }}
                />
                <Span fontSize={"small"} textAlign={"center"}>
                  {formatLabel}
                </Span>
              </SpaceVertical>
            );
          })}
        </>
      )}
    />
  );
};

export default FormFormatData;
