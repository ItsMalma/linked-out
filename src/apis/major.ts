import { useFetch } from "@mantine/hooks";
import { useMemo } from "react";
import { ApiResult, Payload } from "./common";

type Major = {
  id: number;
  name: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export function useMajors(): ApiResult<Major[]> {
  const { data, loading, error } = useFetch<Payload<Major[]>>(
    `${import.meta.env.VITE_BACKEND_URL}/majors`
  );

  return useMemo(
    function () {
      if (error) {
        return { data: null, error };
      }

      if (loading) {
        return { data: false, error: null };
      }

      if (!data) {
        return { data: null, error: null };
      }

      return { data: data.data, error: null };
    },
    [data, loading, error]
  );
}
