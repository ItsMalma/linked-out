import {
  BackgroundImage,
  Box,
  Flex,
  Image,
  Paper,
  PinInput,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authVerify } from "../../apis/auth";
import { isApiErrorValues } from "../../apis/common";
import {
  EmailVerificationFormValues,
  emailVerificationFormSchema,
} from "./schema";

export function EmailVerificationPage() {
  const { nik } = useParams();

  const navigate = useNavigate();

  const form = useForm<EmailVerificationFormValues>({
    mode: "uncontrolled",
    initialValues: {
      code: "",
    },
    validate: valibotResolver(emailVerificationFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = useCallback(
    function (values: EmailVerificationFormValues) {
      if (!nik) return;

      authVerify(
        nik,
        values.code,
        function () {
          navigate("/login");
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
          } else {
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
    [form, navigate, nik]
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
            sm: "550px",
            md: "600px",
            lg: "650px",
            xl: "700px",
          }}
          flex={{
            base: "1 1 0%",
            xs: "0 1 auto",
          }}
        >
          <Flex direction="column" align="center" gap="lg">
            <Text fz={{ base: "h1", xs: "h2" }} fw={600}>
              Verifikasi Email
            </Text>
            <Image
              src="/EmailVerification.svg"
              alt="EmailVerification Illustration"
              w={{
                xs: "300px",
                md: "360px",
                lg: "420px",
                xl: "480px",
              }}
            />
            <Box
              component="form"
              ref={formRef}
              onSubmit={form.onSubmit(onSubmit)}
              w="100%"
            >
              <Stack align="center" w="100%">
                <Text>Kami telah mengirimkan kode ke email Anda!</Text>
                <PinInput
                  w="100%"
                  {...form.getInputProps("code")}
                  length={6}
                  inputMode="numeric"
                  size="md"
                  style={{ justifyContent: "center" }}
                  onComplete={function () {
                    if (formRef.current) {
                      formRef.current.requestSubmit();
                    }
                  }}
                />
              </Stack>
            </Box>
          </Flex>
        </Paper>
      </Flex>
    </BackgroundImage>
  );
}
