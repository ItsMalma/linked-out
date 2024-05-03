import { RegisterFormValues } from "../pages/RegisterPage/schemas";
import { ApiError, Payload } from "./common";

type UserRegisterResponse = {
  nik: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  major: string;
  type: string;
  isVerified: boolean;
};
export function userRegister(
  input: Omit<RegisterFormValues, "passwordConfirmation">,
  onSuccess: (data: UserRegisterResponse) => void,
  onError: (
    error: ApiError<
      | "firstName"
      | "lastName"
      | "nik"
      | "major"
      | "email"
      | "phoneNumber"
      | "password"
    >
  ) => void
) {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: input.firstName,
      lastName: input.lastName,
      nik: input.nik,
      major: input.major,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: input.password,
    }),
  })
    .then(function (response) {
      response
        .json()
        .then(function (body: Payload<UserRegisterResponse>) {
          if (response.status === 201) {
            onSuccess(body.data!);
          } else if (body.error != null) {
            onError(body.error);
          }
        })
        .catch(onError);
    })
    .catch(onError);
}
