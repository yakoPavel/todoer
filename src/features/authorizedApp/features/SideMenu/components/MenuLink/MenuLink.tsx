import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 0.4em 1.2em 0.4em 1.9em;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiary};
  }

  & > span {
    margin: 0 1rem;
  }
`;

type MenuLinkProps = Omit<React.ComponentPropsWithoutRef<"a">, "children"> & {
  /** Link text. It will be placed in the middle. */
  text: string;
  /** A component that will be placed on the left. */
  leftSlot?: React.ReactNode;
  /** A component that will be placed on the right. */
  rightSlot?: React.ReactNode;
};

const MenuLink = ({
  rightSlot,
  leftSlot,
  text,
  ...otherProps
}: MenuLinkProps) => {
  return (
    <StyledLink {...otherProps}>
      {leftSlot}
      <Text>{text}</Text>
      {rightSlot}
    </StyledLink>
  );
};

export default MenuLink;
