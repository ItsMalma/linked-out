import { PasswordInput, TextInput } from "@mantine/core";
import { useRegisterFormContext } from "./form-context";

export function SecondRegisterForm() {
  const form = useRegisterFormContext();

  return (
    <>
      <TextInput
        withAsterisk
        label="EMAIL"
        labelProps={{
          fw: 600,
        }}
        w="100%"
        {...form.getInputProps("email")}
      />
      <TextInput
        withAsterisk
        label="NOMOR HP"
        labelProps={{
          fw: 600,
        }}
        w="100%"
        {...form.getInputProps("phoneNumber")}
        onInput={function (e) {
          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, "");
        }}
      />
      <PasswordInput
        withAsterisk
        label="KATA SANDI"
        labelProps={{
          fw: 600,
        }}
        w="100%"
        {...form.getInputProps("password")}
      />
      <PasswordInput
        withAsterisk
        label="KONFIRMASI KATA SANDI"
        labelProps={{
          fw: 600,
        }}
        w="100%"
        {...form.getInputProps("passwordConfirmation")}
      />
    </>
  );
}
