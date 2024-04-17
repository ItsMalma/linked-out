import {
  Autocomplete,
  Box,
  Button,
  PasswordInput,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useCallback } from "react";
import { FirstRegisterFormValues, firstRegisterFormSchema } from "./schemas";
import { useRegisterStep } from "./useRegisterStep";

export function FirstRegisterForm() {
  const { to, setValues } = useRegisterStep();

  const form = useForm<FirstRegisterFormValues>({
    mode: "uncontrolled",
    initialValues: {
      emailAtauNomorHP: "",
      kataSandi: "",
      namaDepan: "",
      namaBelakang: "",
      nik: "",
      negara: "",
      kodePos: "",
      wilayah: "",
    },
    validate: zodResolver(firstRegisterFormSchema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  const onSubmit = useCallback(
    function (values: FirstRegisterFormValues) {
      setValues({
        emailAtauNomorHP: values.emailAtauNomorHP,
        kataSandi: values.kataSandi,
        namaDepan: values.namaDepan,
        namaBelakang: values.namaBelakang,
        nik: values.nik,
        negara: values.negara,
        kodePos: values.kodePos,
        wilayah: values.wilayah,
      });
      to(2);
    },
    [to, setValues]
  );

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)} w="100%">
      <Stack w="100%">
        <SimpleGrid cols={{ base: 1, xs: 2 }}>
          <TextInput
            withAsterisk
            label="EMAIL ATAU NOMOR HP"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("emailAtauNomorHP")}
          />
          <PasswordInput
            withAsterisk
            label="KATA SANDI"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("kataSandi")}
          />
          <TextInput
            withAsterisk
            label="NAMA DEPAN"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("namaDepan")}
          />
          <TextInput
            label="NAMA BELAKANG"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("namaBelakang")}
          />
          <TextInput
            withAsterisk
            label="NIK"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("nik")}
            maxLength={16}
            onInput={function (e) {
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^0-9.]/g,
                ""
              );
            }}
          />
          <Autocomplete
            withAsterisk
            label="NEGARA"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("negara")}
          />
          <Autocomplete
            withAsterisk
            label="KODE POS"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("kodePos")}
            pattern="^[0-9]*$"
          />
          <Autocomplete
            withAsterisk
            label="WILAYAH"
            labelProps={{
              fw: 600,
            }}
            w="100%"
            {...form.getInputProps("wilayah")}
          />
        </SimpleGrid>
        <Button color="violet" size="md" type="submit">
          Lanjut
        </Button>
      </Stack>
    </Box>
  );
}
