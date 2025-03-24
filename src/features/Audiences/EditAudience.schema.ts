import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  filters: z
    .string()
    .min(1, { message: "Filters input can not be blank" })
    .refine(
      (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch (e) {
          return false;
        }
      },
      { message: "Invalid JSON format" }
    ),
});

export default schema;
