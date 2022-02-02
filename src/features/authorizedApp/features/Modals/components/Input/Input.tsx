/* eslint-disable react/destructuring-assignment */
import React from "react";

import { ColorInput } from "../ColorInput/ColorInput";
import { FormFieldConfig } from "../Form/Form";

import * as Styled from "./styles";

import { InputField } from "@/components/InputField/InputField";

/* Props types */
type BaseInputProps = Omit<FormFieldConfig, "required"> & {
  /** A callback that will be called on change. */
  onChange: ({
    name,
    value,
  }: {
    name: string;
    value: string | boolean;
  }) => void;
};
type TextBasedInputProps = {
  /** A current value. */
  value: string;
  /** A type of the input. */
  type: "color" | "text";
};
type BooleanBasedInputProps = {
  /** A current value. */
  value: boolean;
  /** A type of the input. */
  type: "switch";
};
type InputProps =
  | (BaseInputProps & TextBasedInputProps)
  | (BaseInputProps & BooleanBasedInputProps);

/**
 * It is is generic input component.
 */
export const Input = (props: InputProps) => {
  const { label, type, name, onChange } = props;

  const changeHandler = (
    update: string | React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (typeof update === "string") {
      return onChange({ name, value: update });
    }
    if (update.target.type === "checkbox") {
      return onChange({
        name,
        value: update.target.checked,
      });
    }

    onChange({ name, value: update.target.value });
  };

  return (
    <Styled.InputWrapper type={type}>
      <Styled.InputLabel htmlFor={label} type={type}>
        {label}
      </Styled.InputLabel>
      {props.type === "text" && (
        <InputField
          name={props.label}
          value={props.value}
          onChange={changeHandler}
          id={props.label}
          type="text"
          autoComplete="off"
        />
      )}
      {props.type === "color" && (
        <ColorInput
          name={props.label}
          value={props.value}
          onChange={changeHandler}
        />
      )}
      {props.type === "switch" && (
        <Styled.Switch
          isChecked={props.value}
          name={props.label}
          id={props.label}
          onChange={changeHandler}
          colorScheme="green"
          size="lg"
        />
      )}
    </Styled.InputWrapper>
  );
};
