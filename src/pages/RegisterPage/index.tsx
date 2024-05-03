import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isApiErrorValues } from "../../apis/common";
import { userRegister } from "../../apis/user";
import { FirstRegisterForm } from "./FirstForm";
import { SecondRegisterForm } from "./SecondForm";
import { RegisterFormProvider, useRegisterForm } from "./form-context";
import {
  RegisterFormValues,
  firstRegisterFormSchema,
  secondRegisterFormSchema,
} from "./schemas";

export function RegisterPage() {
  const [step, setStep] = useState(1);

  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useRegisterForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      nik: "",
      major: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: function (values) {
      if (step == 1) {
        return valibotResolver(firstRegisterFormSchema)(values);
      } else if (step == 2) {
        return valibotResolver(secondRegisterFormSchema)(values);
      }
      return {};
    },
  });

  const navigate = useNavigate();

  const onSubmit = useCallback(
    function (values: RegisterFormValues) {
      userRegister(
        values,
        function (data) {
          navigate(`/email-verification/${data.nik}`);
        },
        function (error) {
          console.error(error);
          if (error instanceof Error) {
            notifications.show({
              withCloseButton: false,
              color: "red",
              title: "Gagal memverifikasi pengguna",
              message:
                "Terjadi kesalahan pada server saat memverifikasi pengguna.",
            });
          } else if (isApiErrorValues(error)) {
            form.setErrors(error);
            if (error.firstName || error.lastName || error.nik || error.major) {
              setStep(1);
            }
          } else if (typeof error == "string") {
            notifications.show({
              withCloseButton: false,
              color: "red",
              title: "Gagal memverifikasi pengguna",
              message: error,
            });
          }
        }
      );
    },
    [form, navigate]
  );

  const onNext = useCallback(
    function () {
      if (!form.validate().hasErrors) {
        if (step == 2) {
          formRef.current?.requestSubmit();
          return;
        }
      }
      if (step <= 2 && !form.validate().hasErrors) {
        setStep(step + 1);
      }
    },
    [form, step]
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
            sm: "600px",
            md: "700px",
            lg: "750px",
            xl: "800px",
          }}
          flex={{
            base: "1 1 0%",
            xs: "0 1 auto",
          }}
        >
          <Flex w="100%" direction="column" align="center" gap="lg">
            <Text fz="h2" fw={600}>
              {step == 2
                ? `Halo, ${form.getValues().firstName}!`
                : "Pendaftaran akun"}
            </Text>
            <RegisterFormProvider form={form}>
              <Box
                ref={formRef}
                component="form"
                w="100%"
                onSubmit={form.onSubmit(onSubmit)}
              >
                <Stack w="100%">
                  <SimpleGrid cols={{ base: 1 }}>
                    {step == 1 ? <FirstRegisterForm /> : <SecondRegisterForm />}
                  </SimpleGrid>
                  <Button color="violet" size="md" onClick={onNext}>
                    {step < 1 ? "Lanjut" : "Login"}
                  </Button>
                </Stack>
              </Box>
            </RegisterFormProvider>
            <Text>
              Sudah memiliki akun?{" "}
              <Anchor c="violet" component={Link} to="/login">
                Login Sekarang!
              </Anchor>
            </Text>
          </Flex>
        </Paper>
      </Flex>
    </BackgroundImage>
  );
}
