import * as v from "valibot";
import { isEmail, isMobilePhone } from "validator";

export const loginFormSchema = v.object({
  emailOrPhoneNumber: v.string("Tidak valid", [
    v.minLength(1, "Tidak boleh kosong"),
    v.custom(function (input) {
      return isEmail(input) || isMobilePhone(input);
    }, "Format salah"),
  ]),
  password: v.string("Tidak valid", [
    v.minLength(1, "Tidak boleh kosong"),
    v.minLength(8, "Minimal 8 karakter"),
  ]),
});
export type LoginFormValues = v.Input<typeof loginFormSchema>;
