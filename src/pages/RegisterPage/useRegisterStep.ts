import { create } from "zustand";
import { RegisterFormValues } from "./schemas";

export type RegisterStepState = {
  currentStep: number;
  values?: Partial<RegisterFormValues>;
  to: (newStep: number) => void;
  setValues: (values?: Partial<RegisterFormValues>) => void;
  reset: () => void;
};

export const useRegisterStep = create<RegisterStepState>()(function (set) {
  return {
    currentStep: 1,
    to: function (newStep) {
      if (newStep < 1) newStep = 1;
      set(function () {
        return {
          currentStep: newStep,
        };
      });
    },
    setValues: function (values) {
      set(function () {
        return {
          values: values,
        };
      });
    },
    reset: function () {
      set(function () {
        return {
          currentStep: 1,
          values: undefined,
        };
      });
    },
  };
});
