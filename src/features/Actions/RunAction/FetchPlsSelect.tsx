import React, { FC } from "react";
import FormSelect, {
  FormSelectFieldType,
} from "../../../components/FormSelect/FormSelect";
import { UseMutateFunction } from "react-query";
import { IDataActionForm } from "@looker/sdk";
import { IntegrationMutationParams } from "../useIntegrationForm";
import { useFormContext } from "react-hook-form";
import { GOOGLE_DRIVE_INTEGRATION_ID } from "../../../constants";

const FetchPlsSelect: FC<
  FormSelectFieldType & {
    mutate?: UseMutateFunction<
      IDataActionForm,
      unknown,
      IntegrationMutationParams,
      unknown
    >;
  }
> = ({ mutate, ...rest }) => {
  const { getValues } = useFormContext();
  return (
    <FormSelect
      {...rest}
      placeholder=" "
      onChange={() =>
        mutate?.({
          integrationId: GOOGLE_DRIVE_INTEGRATION_ID,
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
