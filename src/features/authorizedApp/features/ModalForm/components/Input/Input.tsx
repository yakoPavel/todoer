/* eslint-disable react/destructuring-assignment */
import { Switch } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

import ColorInput from "../ColorInput/ColorInput";
import { FormFieldConfig } from "../Form/ModalForm";

type InputTypes = FormFieldConfig["type"];

const InputWrapper = styled.div<{ type: InputTypes }>`
  display: flex;
  flex-direction: ${({ type }) => (type === "switch" ? "row" : "column")};

  &:not(:last-child) {
    margin-bottom: 1.3rem;
  }
`;

export const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.separators};
  background-color: ${({ theme }) => theme.background};
  border-radius: 5px;
  padding: 0.5rem;
  transition: all 0.2s;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.text};
  }
`;

const InputLabel = styled.label<{ type: InputTypes }>`
  font-weight: bold;
  order: ${({ type }) => (type === "switch" ? 1 : "unset")};
  margin-left: ${({ type }) => (type === "switch" ? "1rem" : "unset")};
`;

const StyledSwitch = styled(Switch)`
  & span {
    background-color: ${({ theme }) => theme.switchBackground};
    box-shadow: none !important;
  }
  & [class*="thumb"] {
    background-color: ${({ theme }) => theme.switchThumb};
  }
`;

/* Props types */
type BaseInputProps = Omit<FormFieldConfig, "required"> & {
  /** A label of the input. */
  label: string;
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
const Input = (props: InputProps) => {
  const changeHandler = (
    update: string | React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (typeof update === "string") {
      return props.onChange({ name: props.label, value: update });
    }
    if (update.target.type === "checkbox") {
      return props.onChange({
        name: props.label,
        value: update.target.checked,
      });
    }

    props.onChange({ name: props.label, value: update.target.value });
  };

  return (
    <InputWrapper type={props.type}>
      <InputLabel htmlFor={props.label} type={props.type}>
        {props.label}
      </InputLabel>
      {props.type === "text" && (
        <StyledInput
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
        <StyledSwitch
          isChecked={props.value}
          name={props.label}
          onChange={changeHandler}
          colorScheme="green"
          size="lg"
        />
      )}
    </InputWrapper>
  );
};

export default Input;
