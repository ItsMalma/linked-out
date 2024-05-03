import { createFormContext } from "@mantine/form";
import { RegisterFormValues } from "./schemas";

export const [RegisterFormProvider, useRegisterFormContext, useRegisterForm] =
  createFormContext<RegisterFormValues>();
