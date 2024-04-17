import { isMobilePhone, isPostalCode } from "validator";
import { z } from "zod";

export const firstRegisterFormSchema = z.object({
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
    .min(1, "Harus diisi")
    .min(8, "Minimal 8 karakter"),
  namaDepan: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(1, "Harus diisi"),
  namaBelakang: z.string({
    invalid_type_error: "Tidak valid",
    required_error: "Harus diisi",
  }),
  nik: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(16, "Tidak valid")
    .max(16, "Tidak valid"),
  negara: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(1, "Harus diisi"),
  kodePos: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(1, "Harus diisi")
    .refine(function (value) {
      return isPostalCode(value, "any");
    }, "Tidak valid"),
  wilayah: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(1, "Harus diisi"),
});
export type FirstRegisterFormValues = z.infer<typeof firstRegisterFormSchema>;

export const secondRegisterFormSchema = z.object({
  namaPekerjaanTerakhirBekerja: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(1, "Harus diisi"),
  tipePekerjaanTerakhirBekerja: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(1, "Harus diisi"),
  namaPerusahaanTerakhirBekerja: z
    .string({
      invalid_type_error: "Tidak valid",
      required_error: "Harus diisi",
    })
    .min(1, "Harus diisi"),
  mendaftarSebagai: z.enum(["JobSeeker", "Rekruter"], {
    errorMap: function () {
      return {
        message: "Pilihan tidak valid",
      };
    },
  }),
  namaPekerjaanYangDibutuhkan: z
    .array(
      z.string({
        invalid_type_error: "Tidak valid",
        required_error: "Tidak valid",
      }),
      {
        invalid_type_error: "Tidak valid",
        required_error: "Harus diisi",
      }
    )
    .min(1, "Minimal 1"),
  lokasiPekerjaanYangDibutuhkan: z
    .array(
      z.string({
        invalid_type_error: "Tidak valid",
        required_error: "Tidak valid",
      }),
      {
        invalid_type_error: "Tidak valid",
        required_error: "Harus diisi",
      }
    )
    .min(1, "Minimal 1"),
  dapatRemote: z.boolean({
    invalid_type_error: "Tidak valid",
    required_error: "Harus diisi",
  }),
});
export type SecondRegisterFormValues = z.infer<typeof secondRegisterFormSchema>;

export type RegisterFormValues = FirstRegisterFormValues &
  SecondRegisterFormValues;
