import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Select,
  SimpleGrid,
  Stack,
  TagsInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SecondRegisterFormValues, secondRegisterFormSchema } from "./schemas";
import { useRegisterStep } from "./useRegisterStep";

export function SecondRegisterForm() {
  const navigate = useNavigate();

  const { setValues } = useRegisterStep();

  const form = useForm<SecondRegisterFormValues>({
    mode: "uncontrolled",
    initialValues: {
      namaPekerjaanTerakhirBekerja: "",
      tipePekerjaanTerakhirBekerja: "",
      namaPerusahaanTerakhirBekerja: "",
      mendaftarSebagai: "JobSeeker",
      namaPekerjaanYangDibutuhkan: [],
      lokasiPekerjaanYangDibutuhkan: [],
      dapatRemote: false,
    },
    validate: zodResolver(secondRegisterFormSchema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  const onSubmit = useCallback(
    function (values: SecondRegisterFormValues) {
      // TODO: register user

      setValues({
        namaPekerjaanTerakhirBekerja: values.namaPekerjaanTerakhirBekerja,
        tipePekerjaanTerakhirBekerja: values.tipePekerjaanTerakhirBekerja,
        namaPerusahaanTerakhirBekerja: values.namaPerusahaanTerakhirBekerja,
        mendaftarSebagai: values.mendaftarSebagai,
        namaPekerjaanYangDibutuhkan: values.namaPekerjaanYangDibutuhkan,
        lokasiPekerjaanYangDibutuhkan: values.lokasiPekerjaanYangDibutuhkan,
        dapatRemote: values.dapatRemote,
      });

      navigate("/email-verification");
    },
    [navigate, setValues]
  );

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)} w="100%">
      <Stack w="100%">
        <SimpleGrid cols={{ base: 1, xs: 2 }}>
          <Autocomplete
            withAsterisk
            label="NAMA PEKERJAAN (TERAKHIR BEKERJA)"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("namaPekerjaanTerakhirBekerja")}
          />
          <Select
            withAsterisk
            label="TIPE PEKERJAAN (TERAKHIR BEKERJA)"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("tipePekerjaanTerakhirBekerja")}
          />
          <Autocomplete
            withAsterisk
            label="NAMA PERUSAHAAN (TERAKHIR BEKERJA)"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("namaPerusahaanTerakhirBekerja")}
          />
          <Select
            withAsterisk
            data={["JobSeeker", "Rekruter"]}
            label="MENDAFTAR SEBAGAI"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("mendaftarSebagai")}
          />
          <TagsInput
            withAsterisk
            label="NAMA PEKERJAAN (YANG DIBUTUHKAN)"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("namaPekerjaanYangDibutuhkan")}
          />
          <TagsInput
            withAsterisk
            label="LOKASI PEKERJAAN (YANG DIBUTUHKAN)"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("lokasiPekerjaanYangDibutuhkan")}
          />
          <Checkbox
            label="DAPAT REMOTE"
            fw={600}
            w="100%"
            {...form.getInputProps("dapatRemote")}
          />
        </SimpleGrid>
        <Button type="submit" color="violet" size="md">
          Lanjut
        </Button>
      </Stack>
    </Box>
  );
}
