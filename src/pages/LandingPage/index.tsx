import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { Link } from "react-router-dom";
import classes from "./index.module.css";

export function LandingPage() {
  const [{ y: scrollY }] = useWindowScroll();
  const isMD = useMediaQuery("(min-width: 62em)");

  return (
    <Flex direction="column" mih="100vh" gap={0}>
      <Transition
        mounted={scrollY > 0 && !isMD}
        transition={{
          out: {
            backgroundColor: "var(--mantine-color-violet-filled)",
          },
          in: {
            backgroundColor: "var(--mantine-color-violet-4)",
          },
          transitionProperty: "background-color",
        }}
        duration={1000}
        keepMounted
      >
        {function (style) {
          return (
            <Box
              pos={{ base: "sticky", md: "static" }}
              top={0}
              className={classes.toFront}
              style={{
                backgroundColor: "var(--mantine-color-violet-filled)",
                ...style,
                display: "unset",
              }}
            >
              <Container
                c="white"
                w="100%"
                size="lg"
                py="md"
                px={{ base: "lg", xs: "3rem" }}
              >
                <Flex align="center" justify="space-between">
                  <Title size="h2">LinkedOut</Title>
                  <Button
                    bg="white"
                    c="black"
                    radius="xl"
                    fw="bold"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                </Flex>
              </Container>
            </Box>
          );
        }}
      </Transition>
      <Box bg="violet" c="white">
        <BackgroundImage src="/DiscordBackground.svg">
          <Container
            w="100%"
            size="md"
            py={{ base: "4rem", xs: "8rem" }}
            px={{ base: "lg", xs: "3rem" }}
          >
            <Flex
              direction="column"
              gap="xl"
              align={{ base: "start", xs: "center" }}
              justify="center"
            >
              <Text
                fz={{ base: "1.5rem", xs: "3rem" }}
                fw={900}
                ta={{ base: "left", xs: "center" }}
              >
                BAYANGKAN SEBUAH TEMPAT...
              </Text>
              <Text size="lg" ta={{ base: "left", xs: "center" }}>
                ...dimana kalian dapat bertemu dengan teman - teman sekolah
                Anda. Dimana kalian dapat saling berbagi cerita, ide,
                pengalaman, dan informasi mengenai dunia kerja. Sebuah tempat
                yang <span className={classes.pertekan}>MENYATUKAN</span>{" "}
                kembali mereka - mereka yang jauh di{" "}
                <span className={classes.pertekan}>LUAR</span> sana.
              </Text>
              <Group>
                <Button
                  fz={{ base: "md", xs: "lg" }}
                  size="lg"
                  radius="xl"
                  color="dark"
                  fw={500}
                  component={Link}
                  to="/login"
                >
                  Buka LinkedOut di browser Anda
                </Button>
              </Group>
            </Flex>
          </Container>
        </BackgroundImage>
      </Box>
      <Stack gap={0}>
        <Box bg="white" c="black">
          <Container
            w="100%"
            size="lg"
            py="6rem"
            px={{ base: "lg", xs: "3rem" }}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "xl", md: "5rem" }}
              align="center"
            >
              <Image src="/Profile.svg" alt="Profile" flex="1 1 0%" maw={512} />
              <Flex direction="column" flex="1 1 0%" gap="lg">
                <Title fz={{ base: "h2", xs: "h1", md: "3rem" }}>
                  Buat pekerjaan menemukan Anda
                </Title>
                <Text fz="xl">
                  Buat profil dan resume mengenai diri Anda dengan mudah dan
                  gratis hingga diri Anda dapat berada di pencarian teratas
                  perusahaan dan rekruter.
                </Text>
              </Flex>
            </Flex>
          </Container>
        </Box>
        <Box bg="gray.1" c="black">
          <Container
            w="100%"
            size="lg"
            py="6rem"
            px={{ base: "lg", xs: "3rem" }}
          >
            <Flex
              direction={{ base: "column", md: "row-reverse" }}
              gap={{ base: "xl", md: "5rem" }}
              align="center"
            >
              <Image
                src="/Communication.svg"
                alt="Communication"
                flex="1 1 0%"
                maw={512}
              />
              <Flex direction="column" flex="1 1 0%" gap="lg">
                <Title fz={{ base: "h2", xs: "h1", md: "3rem" }}>
                  Komunikasi adalah kunci
                </Title>
                <Text fz="xl">
                  Berkomunikasi dapat membantu Anda mengetahui lebih banyak
                  informasi, Mulailah obrolan dengan teman - teman Anda atau
                  orang lain secara real-time dan gratis.
                </Text>
              </Flex>
            </Flex>
          </Container>
        </Box>
        <Box bg="white" c="black">
          <Container
            w="100%"
            size="lg"
            py="6rem"
            px={{ base: "lg", xs: "3rem" }}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "xl", md: "5rem" }}
              align="center"
            >
              <Image src="/Search.svg" alt="Search" flex="1 1 0%" maw={512} />
              <Flex direction="column" flex="1 1 0%" gap="lg">
                <Title fz={{ base: "h2", xs: "h1", md: "3rem" }}>
                  Pencarian tingkat lanjut
                </Title>
                <Text fz="xl">
                  Lakukan pencarian terhadap apapun dengan lebih mudah melalui
                  serangkaian filter dan kriteria yang telah disediakan.
                </Text>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </Stack>
      <Box bg="dark" c="white">
        <Container w="100%" size="lg" p={{ base: "lg", xs: "3rem" }}>
          <Flex direction="column">
            <Group py="xl" align="start">
              <Flex direction="column" flex="1 1 0%" gap="lg">
                <Title fz="lg" fw={500} c="violet">
                  Tim
                </Title>
                <Stack gap="4px">
                  <Anchor c="white">Tentang Kami</Anchor>
                  <Anchor c="white">Kontak Kami</Anchor>
                </Stack>
              </Flex>
              <Flex direction="column" flex="1 1 0%" gap="lg">
                <Title fz="lg" fw={500} c="violet">
                  Aplikasi
                </Title>
                <Stack gap="4px">
                  <Anchor c="white">Status</Anchor>
                </Stack>
              </Flex>
              <Flex direction="column" flex="1 1 0%" gap="lg">
                <Title fz="lg" fw={500} c="violet">
                  Informasi
                </Title>
                <Stack gap="4px">
                  <Anchor c="white">Bantuan</Anchor>
                  <Anchor c="white">Syarat dan Ketentuan</Anchor>
                  <Anchor c="white">Kebijakan Privasi</Anchor>
                  <Anchor c="white">Hak Cipta</Anchor>
                </Stack>
              </Flex>
            </Group>
            <Divider color="violet" />
            <Flex align="center" justify="space-between" py="xl">
              <Title size="h2">LinkedOut</Title>
              <Button
                color="violet"
                radius="xl"
                component={Link}
                to="/register"
              >
                Daftar
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
