/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import {
  ListboxButton,
  ListboxInput,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from "@reach/listbox";
import React from "react";

import { positionPopover } from "./utils";

import { InputField } from "@/components/InputField/InputField";
import { LABEL_COLORS } from "@/config/labelColors";

const itemStyles = css`
  display: flex;
  min-width: 15rem;
  justify-content: flex-start;
  align-items: center;

  &:before {
    content: "";
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    margin-right: 1rem;
    margin-left: 1rem;
  }
`;
const StyledListboxButton = styled(InputField.withComponent(ListboxButton))<{
  value: string;
}>`
  ${itemStyles}
  &:before {
    background-color: ${({ value }) => value};
  }
`;

const StyledListboxOption = styled(ListboxOption)`
  list-style: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme }) => theme.text};

  &:hover,
  &[aria-selected="true"] {
    background-color: ${({ theme }) => theme.backgroundTertiary};
  }

  &:before {
    background-color: ${({ value }) => value};
  }

  ${itemStyles}
`;

const StyledListboxList = styled(InputField.withComponent(ListboxList))`
  position: relative;
  background: ${({ theme }) => theme.background};
  overflow-y: scroll;
  overflow-x: hidden;
  height: 28rem;
  padding: 0;
  z-index: 600;

  &:focus {
    border-color: ${({ theme }) => theme.separators};
  }
`;

type ColorInputProps = {
  /** A name of the filed. */
  name: string;
  /** A current value. */
  value: string;
  /** A callback that will be invoked on change. */
  onChange: (newValue: string) => void;
};

export const ColorInput: React.FC<ColorInputProps> = ({
  name,
  value,
  onChange,
}) => {
  return (
    <ListboxInput
      aria-label={name}
      defaultValue={LABEL_COLORS[0].value}
      onChange={onChange}
      value={value || LABEL_COLORS[0].value}
    >
      <StyledListboxButton value={value || LABEL_COLORS[0].value} />
      <ListboxPopover position={positionPopover}>
        <StyledListboxList>
          {LABEL_COLORS.map((color) => {
            return (
              <StyledListboxOption
                key={color.value}
                value={color.value}
                data-testid={color.value}
              >
                {color.label}
              </StyledListboxOption>
            );
          })}
        </StyledListboxList>
      </ListboxPopover>
    </ListboxInput>
  );
};
