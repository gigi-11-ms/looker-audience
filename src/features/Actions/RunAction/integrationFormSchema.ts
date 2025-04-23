import { IDataActionForm } from "@looker/sdk";
import { z } from "zod";

const getIntegrationFormSchema = (fields: IDataActionForm["fields"]) => {
  const schema: Record<string, z.ZodType<any>> = {};

  fields?.forEach((field) => {
    const { name, required } = field;

    schema[name || ""] = required
      ? z.string().min(1, { message: `${name} is a required field` })
      : z.string();
  });

  return z.object({
    title: z.string().min(1, { message: "Title is a required field" }),
    formatDataAs: z.string().min(1, { message: "Choose at least one format" }),
    integrationForm: z.object(schema),
    crontab: z.string().optional().nullable()
  });
};

export default getIntegrationFormSchema;
