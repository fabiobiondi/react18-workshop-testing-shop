import { useEffect, useState } from "react";
import { Client } from "../../../model/order";
import { entries } from "../../../shared/utils/object.utils";
import { useCheckout } from "./useCheckout";

const initialState: Omit<Client, "id"> = {
  first_name: "",
  last_name: "",
  email: "",
  country: "",
  street: "",
  city: "",
  state_prov: "",
  zip: "",
  notification_email: true,
  notification_sms: false,
};

type FormState = typeof initialState;

type FormValidationRules = Partial<Record<keyof FormState, "required">>;

type FormValidationState = Partial<Record<keyof FormState, string>>;

const formValidationRules: FormValidationRules = {
  first_name: "required",
  last_name: "required",
  email: "required",
  country: "required",
  street: "required",
  city: "required",
  state_prov: "required",
  zip: "required",
};

export function useCheckoutForm() {
  const { sendOrder } = useCheckout();
  const [formData, setFormData] = useState<FormState>(initialState);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formValidation, setFormValidation] = useState<FormValidationState>({});
  const [dirty, setDirty] = useState(false);

  function validateName(name: string): name is keyof FormState {
    return Object.keys(initialState).includes(name);
  }

  function reset() {
    setFormData({ ...initialState });
    setDirty(false);
  }

  function updateField<K extends keyof FormState, V extends FormState[K]>(
    field: K,
    value: V
  ) {
    setFormData({ ...formData, [field]: value });
    setDirty(true);
  }

  async function submit(): Promise<void> {
    await sendOrder(formData);
    reset();
  }

  useEffect(() => {
    let isValid = true;
    const validation = entries(formData).reduce<FormValidationState>(
      (acc, [key, value]) => {
        const validationRule = formValidationRules[key];
        if (!validationRule || (validationRule === "required" && !!value))
          return acc;

        isValid = false;
        acc[key] = "This field is required";
        return acc;
      },
      {}
    );

    setFormValidation(validation);
    setIsFormValid(isValid);
  }, [formData]);

  return {
    formData,
    dirty,
    formValidation,
    isFormValid,
    validateName,
    submit,
    updateField,
    reset,
  };
}
