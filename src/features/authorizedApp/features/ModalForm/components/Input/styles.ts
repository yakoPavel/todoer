import { Switch as ChakraSwitch } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";

import { FormFieldConfig } from "../Form/ModalForm";

type InputTypes = FormFieldConfig["type"];

export const InputWrapper = styled.div<{ type: InputTypes }>`
  display: flex;
  flex-direction: ${({ type }) => (type === "switch" ? "row" : "column")};

  &:not(:last-child) {
    margin-bottom: 1.3rem;
  }
`;

export const Input = styled.input`
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

export const InputLabel = styled.label<{ type: InputTypes }>`
  font-weight: bold;
  order: ${({ type }) => (type === "switch" ? 1 : "unset")};
  margin-left: ${({ type }) => (type === "switch" ? "1rem" : "unset")};
`;

export const Switch = styled(ChakraSwitch)`
  & span {
    background-color: ${({ theme }) => theme.switchBackground};
    box-shadow: none !important;
  }
  & [class*="thumb"] {
    background-color: ${({ theme }) => theme.switchThumb};
  }
`;
