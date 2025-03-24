import React, { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  getProviderIconSrc,
  getProviderLabel,
  PROVIDERS,
} from "../../../constants";
import { SpaceVertical, Span } from "@looker/components";

type FormActionProviderType = {
  name: string;
};

const FormActionProvider: FC<FormActionProviderType> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: formValue } }) => (
        <>
          {PROVIDERS.map((value) => {
            const iconSrc = getProviderIconSrc(value);
            const providerLabel = getProviderLabel(value);
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
                  {providerLabel}
                </Span>
              </SpaceVertical>
            );
          })}
        </>
      )}
    />
  );
};

export default FormActionProvider;
