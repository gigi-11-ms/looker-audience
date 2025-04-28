import React, { FC } from "react";
import FormSelect, {
  FormSelectFieldType,
} from "../../../components/FormSelect/FormSelect";
import { UseMutateFunction } from "react-query";
import { IDataActionForm } from "@looker/sdk";
import { IntegrationFormParams } from "../useIntegrationForm";
import { useFormContext } from "react-hook-form";

const LoginCidSelect: FC<
  FormSelectFieldType & {
    mutate?: UseMutateFunction<
      IDataActionForm,
      unknown,
      IntegrationFormParams,
      unknown
    >;
    provider: string;
  }
> = ({ mutate, provider, ...rest }) => {
  const { setValue } = useFormContext();
  return (
    <FormSelect
      {...rest}
      placeholder=" "
      onChange={(value) => {
        setValue("loginCid", value, { shouldValidate: true });
        mutate?.({
          integrationId: provider,
          body: {
            loginCid: value,
          },
        });
      }}
    />
  );
};

export default LoginCidSelect;
