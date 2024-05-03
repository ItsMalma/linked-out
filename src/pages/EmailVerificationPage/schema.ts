import * as v from "valibot";

export const emailVerificationFormSchema = v.object({
  code: v.string("Tidak valid", [v.length(6, "Harus 6 karakter")]),
});
export type EmailVerificationFormValues = v.Input<
  typeof emailVerificationFormSchema
>;
