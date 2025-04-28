import React, { FC } from "react";
import FormSelect, {
  FormSelectFieldType,
} from "../../../components/FormSelect/FormSelect";
import { UseMutateFunction } from "react-query";
import { IDataActionForm } from "@looker/sdk";
import { IntegrationFormParams } from "../useIntegrationForm";
import { useFormContext } from "react-hook-form";

const CreateOrAppendSelect: FC<
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
  const { getValues, setValue } = useFormContext();
  const loginCid = getValues("integrationForm.loginCid");

  return (
    <FormSelect
      {...rest}
      placeholder=" "
      onChange={(value) => {
        setValue("createOrAppend", value, {
          shouldValidate: true,
        });
        mutate?.({
          integrationId: provider,
          body: {
            loginCid,
            createOrAppend: value,
          },
        });
      }}
    />
  );
};

export default CreateOrAppendSelect;
