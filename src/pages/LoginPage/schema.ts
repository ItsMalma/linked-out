import { isMobilePhone } from "validator";
import { z } from "zod";

export const loginFormSchema = z.object({
  emailAtauNomorHP: z.union(
    [
      z
        .string({
          invalid_type_error: "Tidak valid",
          required_error: "Harus diisi",
        })
        .min(1, "Harus diisi")
        .email("Tidak valid"),
      z
        .string({
          invalid_type_error: "Tidak valid",
          required_error: "Harus diisi",
        })
        .min(1, "Harus diisi")
        .refine(isMobilePhone, "Tidak valid"),
    ],
    {
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    }
  ),
  kataSandi: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(1, "Harus diisi"),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;
