import React, { FC } from "react";
import FormSelect, {
  FormSelectFieldType,
} from "../../../components/FormSelect/FormSelect";
import { UseMutateFunction } from "react-query";
import { IDataActionForm } from "@looker/sdk";
import { IntegrationFormParams } from "../useIntegrationForm";
import { useFormContext } from "react-hook-form";
import { GOOGLE_DRIVE_INTEGRATION_ID } from "../../../constants";

const FetchPlsSelect: FC<
  FormSelectFieldType & {
    mutate?: UseMutateFunction<
      IDataActionForm,
      unknown,
      IntegrationFormParams,
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
