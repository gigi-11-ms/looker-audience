import React, { FC } from "react";
import FormSelect, {
  FormSelectFieldType,
} from "../../../components/FormSelect/FormSelect";
import { UseMutateFunction } from "react-query";
import { IDataActionForm } from "@looker/sdk";
import { IntegrationFormParams } from "../useIntegrationForm";
import { useFormContext } from "react-hook-form";

const FetchPlsSelect: FC<
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
  const { getValues } = useFormContext();
  
  return (
    <FormSelect
      {...rest}
      placeholder=" "
      onChange={() =>
        mutate?.({
          integrationId: provider,
          body: {
            drive: getValues("integrationForm.drive"),
            fetchpls: "fetch",
          },
        })
      }
    />
  );
};

export default FetchPlsSelect;
