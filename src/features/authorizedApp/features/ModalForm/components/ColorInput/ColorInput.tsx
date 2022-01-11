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
import { LABEL_COLORS } from "config/labelColors";
import React from "react";

import { Input } from "../Form/styles";

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

const StyledListboxButton = styled(Input.withComponent(ListboxButton))<{
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

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiary};
  }

  &:before {
    background-color: ${({ value }) => value};
  }

  ${itemStyles}
`;

const StyledListboxList = styled(Input.withComponent(ListboxList))`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 30rem;
  padding: 0;
`;

type Color = typeof LABEL_COLORS[number]["value"];

type ColorInputProps = {
  /** A name of the filed. */
  name: string;
  /** A current value. */
  value: Color;
  /** A callback that will be invoked on change. */
  onChange: ({ name, value }: { name: string; value: Color }) => void;
};

const ColorInput: React.FC<ColorInputProps> = ({ name, value, onChange }) => {
  const onChangeHandler = (newValue: Color) => {
    onChange({ name, value: newValue });
  };

  return (
    <ListboxInput
      aria-label={name}
      defaultValue={LABEL_COLORS[0].value}
      onChange={onChangeHandler}
      value={value}
    >
      <StyledListboxButton value={value} />
      <ListboxPopover>
        <StyledListboxList>
          {LABEL_COLORS.map((color) => {
            return (
              <StyledListboxOption key={color.value} value={color.value}>
                {color.label}
              </StyledListboxOption>
            );
          })}
        </StyledListboxList>
      </ListboxPopover>
    </ListboxInput>
  );
};

export default ColorInput;
