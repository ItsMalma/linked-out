import { Anchor, BackgroundImage, Flex, Paper, Text } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FirstRegisterForm } from "./FirstForm";
import { SecondRegisterForm } from "./SecondForm";
import { useRegisterStep } from "./useRegisterStep";

export function RegisterPage() {
  const { reset, currentStep, values } = useRegisterStep();

  useEffect(function () {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useMemo(
    function () {
      switch (currentStep) {
        case 1:
          return <FirstRegisterForm />;
        case 2:
          return <SecondRegisterForm />;
      }
    },
    [currentStep]
  );

  const titleText = useMemo(
    function () {
      if (values?.namaDepan) {
        return `Halo, ${values.namaDepan}!`;
      }
      return "Pendaftaran akun";
    },
    [values]
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
              {titleText}
            </Text>
            {form}
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
