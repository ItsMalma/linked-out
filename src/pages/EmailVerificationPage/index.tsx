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
import { useForm, zodResolver } from "@mantine/form";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailVerificationFormValues,
  emailVerificationFormSchema,
} from "./schema";

export function EmailVerificationPage() {
  const navigate = useNavigate();

  const form = useForm<EmailVerificationFormValues>({
    mode: "uncontrolled",
    initialValues: {
      kode: "",
    },
    validate: zodResolver(emailVerificationFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = useCallback(
    function () {
      navigate("/login");
    },
    [navigate]
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
                  {...form.getInputProps("kode")}
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
