import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Flex,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { authLogin } from "../../apis/auth";
import { isApiErrorValues } from "../../apis/common";
import { LoginFormValues, loginFormSchema } from "./schema";

export function LoginPage() {
  const form = useForm<LoginFormValues>({
    mode: "uncontrolled",
    initialValues: {
      emailOrPhoneNumber: "",
      password: "",
    },
    validate: valibotResolver(loginFormSchema),
  });

  const [, setCookie] = useCookies(["token"]);

  const onSubmit = useCallback(
    function (values: LoginFormValues) {
      authLogin(
        values,
        function (token) {
          setCookie("token", token);
        },
        function (error) {
          console.error(error);
          if (error instanceof Error) {
            notifications.show({
              withCloseButton: false,
              color: "red",
              title: "Gagal login",
              message: "Terjadi kesalahan pada server saat login.",
            });
          } else if (isApiErrorValues(error)) {
            form.setErrors(error);
          } else if (typeof error == "string") {
            notifications.show({
              withCloseButton: false,
              color: "red",
              title: "Gagal login",
              message: error,
            });
          }
        }
      );
    },
    [form, setCookie]
  );

  return (
    <BackgroundImage src="/DiscordLoginBackground.svg" bgsz="auto">
      <Flex direction="column" mih="100vh" align="center" justify="center">
        <Paper
          p={{ base: "md", xs: "xl" }}
          radius="sm"
          shadow="xl"
          w={{
            base: "100%",
            xs: "500px",
            sm: "650px",
            md: "800px",
            lg: "950px",
            xl: "900px",
          }}
          flex={{
            base: "1 1 0%",
            xs: "0 1 auto",
          }}
        >
          <Flex align="center" gap="xl">
            <Flex w="100%" direction="column" align="center" gap="lg">
              <Stack gap="4px">
                <Text fz="h2" fw={600}>
                  Selamat datang kembali!
                </Text>
                <Text>Kami sangat senang melihat Anda kembali!</Text>
              </Stack>
              <Box component="form" onSubmit={form.onSubmit(onSubmit)} w="100%">
                <Stack w="100%">
                  <TextInput
                    withAsterisk
                    label="EMAIL ATAU NOMOR HP"
                    labelProps={{
                      fw: 600,
                    }}
                    w="100%"
                    {...form.getInputProps("emailOrPhoneNumber")}
                  />
                  <Flex direction="column">
                    <PasswordInput
                      withAsterisk
                      label="KATA SANDI"
                      labelProps={{
                        fw: 600,
                      }}
                      w="100%"
                      {...form.getInputProps("password")}
                    />
                    <Anchor c="violet">Lupa kata sandi?</Anchor>
                  </Flex>
                  <Button type="submit" color="violet" size="md">
                    Login
                  </Button>
                </Stack>
              </Box>
              <Text>
                Belum punya akun?{" "}
                <Anchor c="violet" component={Link} to="/register">
                  Daftar Sekarang!
                </Anchor>
              </Text>
            </Flex>
            <Image
              src="/Login.svg"
              alt="Login Illustration"
              w={{
                md: 280,
                lg: 320,
                xl: 360,
              }}
              visibleFrom="md"
            />
          </Flex>
        </Paper>
      </Flex>
    </BackgroundImage>
  );
}
