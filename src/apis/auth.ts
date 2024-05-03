import { LoginFormValues } from "../pages/LoginPage/schema";
import { ApiError, Payload } from "./common";

export function authLogin(
  input: LoginFormValues,
  onSuccess: (token: string) => void,
  onError: (error: ApiError<"emailOrPhoneNumber" | "password">) => void
) {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then(function (response) {
      response
        .json()
        .then(function (body: Payload<string>) {
          if (response.status === 200) {
            onSuccess(body.data!);
          } else if (body.error != null) {
            onError(body.error);
          }
        })
        .catch(onError);
    })
    .catch(onError);
}

export function authVerify(
  nik: string,
  code: string,
  onSuccess: () => void,
  onError: (error: ApiError) => void
) {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify/${nik}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code,
    }),
  })
    .then(function (response) {
      response
        .json()
        .then(function (
          body: Payload<{
            nik: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            type: string;
            isVerified: boolean;
          }>
        ) {
          if (response.status === 200) {
            onSuccess();
          } else if (body.error != null) {
            onError(body.error);
          }
        })
        .catch(onError);
    })
    .catch(onError);
}
