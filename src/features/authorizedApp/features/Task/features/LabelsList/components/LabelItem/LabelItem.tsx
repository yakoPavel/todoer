import { Text } from "@chakra-ui/react";
import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled/macro";
import React from "react";
import { MdLabel } from "react-icons/md";

import { ReactComponent as CheckedCheckboxIcon } from "../../assets/checkboxChecked.svg";
import { ReactComponent as UncheckedCheckboxIcon } from "../../assets/checkboxUnchecked.svg";

const Container = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiary};
  }
`;

const IconContainer = styled("span", { shouldForwardProp: isPropValid })<{
  color: string;
}>`
  color: ${({ color }) => color};
`;

const Title = styled(Text)`
  margin-left: 1.5rem;
`;

const CheckboxContainer = styled.span`
  color: ${({ theme }) => theme.textSecondaryActive};
  margin-left: auto;
`;

export type LabelItemProps = {
  /** A color of the label. */
  color: string;
  /** A title of the label. */
  title: string;
  /** Whether or not the item is checked. */
  isChecked: boolean;
  /** A callback that will be called when the user checks/unchecks this item. */
  onChange: (isChecked: boolean) => void;
};

export const LabelItem = ({
  color,
  title,
  isChecked,
  onChange,
}: LabelItemProps) => {
  const onItemClick = () => {
    onChange(!isChecked);
  };

  return (
    <Container
      role="option"
      aria-selected={isChecked}
      aria-checked={isChecked}
      onClick={onItemClick}
    >
      <IconContainer color={color} data-testid="labelIcon">
        <MdLabel size="1.8rem" />
      </IconContainer>
      <Title>{title}</Title>
      <CheckboxContainer aria-hidden={true} data-testid="checkboxIcon">
        {isChecked ? <CheckedCheckboxIcon /> : <UncheckedCheckboxIcon />}
      </CheckboxContainer>
    </Container>
  );
};