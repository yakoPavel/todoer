import React from "react";

import { FormState } from "../../../types";
import { Input } from "../../Input/Input";
import { FormFieldConfig } from "../Form";

import { LABEL_COLORS } from "@/config/labelColors";

type NewStateValue<Data extends FormFieldConfig[]> = {
  name: keyof FormState<Data>;
  value: string;
};

type Update<Data extends FormFieldConfig[]> = {
  newStateValue: NewStateValue<Data>;
  formFieldsConfig: FormFieldConfig[];
};

function formStateReducer<Data extends FormFieldConfig[]>(
  state: FormState<Data>,
  update: Update<Data>,
) {
  const newValues = {
    ...state.values,
    [update.newStateValue.name]: update.newStateValue.value,
  };

  // The efficiency of the code below can be questionable if we work with a
  // large data set, but all our forms will have only a few fields, so it's okay.
  const isValid = !Object.entries(newValues).some(
    ([fieldName, currentValue]) => {
      const isFieldRequired = update.formFieldsConfig.find(
        (fieldConfig) => fieldConfig.label === fieldName,
      )?.required;
      return isFieldRequired && currentValue === "";
    },
  );

  return {
    isValid,
    values: newValues,
  } as FormState<Data>;
}

function getInitialState<Data extends FormFieldConfig[]>(
  formFieldsConfig: Data,
) {
  const isValid = !formFieldsConfig.some(
    (fieldConfig) =>
      fieldConfig.type === "text" &&
      fieldConfig.required &&
      !fieldConfig.initialValue,
  );

  const initialValueForTypes = {
    text: "",
    switch: false,
    color: LABEL_COLORS[0].value,
  };

  return {
    isValid,
    values: Object.fromEntries(
      formFieldsConfig.map(({ name, type, initialValue }) => [
        name,
        initialValue ?? initialValueForTypes[type],
      ]),
    ),
  } as FormState<Data>;
}

/**
 * It is a hook that encapsulates the input fields creation and state management.
 *
 * @param formFieldsConfig - A configuration object based on which the fields will be created.
 */
function useFormState<Data extends FormFieldConfig[]>(formFieldsConfig: Data) {
  const [formState, updateFormState] = React.useReducer(
    formStateReducer,
    // Typescript can't correctly infer the type here
    formFieldsConfig as any,
    getInitialState,
  );

  const onChange = (newValue: { name: string; value: string | boolean }) => {
    function isCorrectNewStateValue(
      value: typeof newValue,
    ): asserts value is NewStateValue<Data> {
      if (!(value.name in formState.values)) {
        throw new Error(
          `There is no field with the name ${value.name} in the state.`,
        );
      }
    }

    isCorrectNewStateValue(newValue);
    updateFormState({ formFieldsConfig, newStateValue: newValue });
  };

  const formFields = formFieldsConfig.map(({ label, type, name }) => {
    const value = formState.values[name];

    /* 
      It's not a very elegant code below, but we need it for typescript to 
      correctly narrows down the types.
    */
    if (type === "switch" && typeof value === "boolean") {
      return (
        <Input
          key={name}
          name={name}
          label={label}
          type={type}
          value={value}
          onChange={onChange}
        />
      );
    }
    if (type !== "switch" && typeof value === "string") {
      return (
        <Input
          key={name}
          name={name}
          label={label}
          type={type}
          value={value}
          onChange={onChange}
        />
      );
    }

    return null;
  });

  return {
    formFields,
    formState,
  };
}

export { useFormState };
