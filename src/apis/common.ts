export type ApiErrorValues<Key extends string = string> = Record<
  Key,
  string[] | undefined
>;

export type Payload<TData, TErrorKeys extends string = string> = {
  data: TData | null;
  error: string | ApiErrorValues<TErrorKeys> | null;
};

export type ApiError<TErrorKeys extends string = string> =
  | Error
  | string
  | ApiErrorValues<TErrorKeys>;

export function isApiErrorValues<TErrorKeys extends string = string>(
  apiError: ApiError<TErrorKeys>
): apiError is ApiErrorValues<TErrorKeys> {
  if (typeof apiError == "object" && !(apiError instanceof Error)) {
    for (const key in apiError) {
      if (typeof key != "string") return false;
      const errors = apiError[key];
      if (Array.isArray(errors)) {
        for (const error of errors) {
          if (typeof error != "string") return false;
        }
        return true;
      }
      return errors == undefined;
    }
  }
  return false;
}

export type ApiResult<TData, TErrorKeys extends string = string> = {
  data: TData | false | null;
  error: ApiError<TErrorKeys> | null;
};
