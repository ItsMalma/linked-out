import { Autocomplete, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useMajors } from "../../apis/major";
import { useRegisterFormContext } from "./form-context";

export function FirstRegisterForm() {
  const form = useRegisterFormContext();

  const { data: majors, error: errorMajors } = useMajors();
  useEffect(
    function () {
      if (errorMajors instanceof Error) {
        notifications.show({
          withCloseButton: false,
          color: "red",
          title: "Gagal mengambil data jurusan",
          message:
            "Terjadi kesalahan pada server saat mengambil data jurusan yang membuat auto-complete untuk input jurusan tidak muncul.",
        });
      }
    },
    [errorMajors]
  );

  return (
    <>
      <TextInput
        withAsterisk
        label="NAMA DEPAN"
        labelProps={{
          fw: 600,
        }}
        w="100%"
        {...form.getInputProps("firstName")}
      />
      <TextInput
        label="NAMA BELAKANG"
        labelProps={{
          fw: 600,
        }}
        w="100%"
        {...form.getInputProps("lastName")}
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
          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, "");
        }}
      />
      <Autocomplete
        withAsterisk
        label="JURUSAN"
        labelProps={{
          fw: 600,
        }}
        w="100%"
        {...form.getInputProps("major")}
        data={
          majors && !(majors instanceof Error)
            ? majors.map((major) => major.name)
            : []
        }
      />
    </>
  );
}
