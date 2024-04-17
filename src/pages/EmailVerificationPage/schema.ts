import { z } from "zod";

export const emailVerificationFormSchema = z.object({
  kode: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(6, "Harus 6 karakter")
    .max(6, "Harus 6 karakter"),
});
export type EmailVerificationFormValues = z.infer<
  typeof emailVerificationFormSchema
>;
