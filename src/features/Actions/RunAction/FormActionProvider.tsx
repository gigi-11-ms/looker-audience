import React, { FC } from "react";
import {
  getProviderIconSrc,
  getProviderLabel,
  PROVIDERS,
  ProviderType,
} from "../../../constants";
import { SpaceVertical, Span } from "@looker/components";

type FormActionProviderType = {
  onChange: (value: ProviderType) => void;
  selectedValue: ProviderType;
};

const FormActionProvider: FC<FormActionProviderType> = ({
  onChange,
  selectedValue,
}) => {
  return (
    <>
      {PROVIDERS.map((value) => {
        const iconSrc = getProviderIconSrc(value);
        const providerLabel = getProviderLabel(value);
        const isSelected = selectedValue === value;
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
  );
};

export default FormActionProvider;
