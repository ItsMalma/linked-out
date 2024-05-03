import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { theme } from "./libs/mantine";
import { router } from "./libs/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <MantineProvider theme={theme} forceColorScheme="light">
        <Notifications />
        <RouterProvider router={router} />
      </MantineProvider>
    </CookiesProvider>
  </React.StrictMode>
);
