import * as v from "valibot";
import { isMobilePhone, isNumeric } from "validator";

export const firstRegisterFormSchema = v.object({
  firstName: v.string("Tidak valid", [v.minLength(1, "Tidak boleh kosong")]),
  lastName: v.string("Tidak valid"),
  nik: v.string("Tidak valid", [
    v.length(16, "Format NIK salah"),
    v.custom(isNumeric, "Format NIK salah"),
  ]),
  major: v.string("Tidak valid", [v.minLength(1, "Tidak boleh kosong")]),
});
export type FirstRegisterFormValues = v.Input<typeof firstRegisterFormSchema>;

export const secondRegisterFormSchema = v.object(
  {
    email: v.string("Tidak valid", [
      v.minLength(1, "Tidak boleh kosong"),
      v.email("Format email salah"),
    ]),
    phoneNumber: v.string("Tidak valid", [
      v.minLength(1, "Tidak boleh kosong"),
      v.custom(isMobilePhone, "Format nomor telepon salah"),
    ]),
    password: v.string("Tidak valid", [
      v.minLength(1, "Tidak boleh kosong"),
      v.minLength(8, "Minimal 8 karakter"),
    ]),
    passwordConfirmation: v.string("Tidak valid", [
      v.minLength(1, "Tidak boleh kosong"),
      v.minLength(8, "Minimal 8 karakter"),
    ]),
  },
  [
    v.forward(
      v.custom(function ({ password, passwordConfirmation }) {
        return password === passwordConfirmation;
      }, "Konfirmasi kata sandi tidak sama"),
      ["passwordConfirmation"]
    ),
  ]
);
export type SecondRegisterFormValues = v.Input<typeof secondRegisterFormSchema>;

export type RegisterFormValues = FirstRegisterFormValues &
  SecondRegisterFormValues;
