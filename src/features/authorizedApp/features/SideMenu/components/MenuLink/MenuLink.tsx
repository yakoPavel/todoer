import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 0.4em 1.3rem 0.4em 3rem;
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

const LeftSlotWrapper = styled.div`
  margin-right: 2rem;
`;

const RightSlotWrapper = styled.div`
  margin-left: auto;
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
      {leftSlot && <LeftSlotWrapper>{leftSlot}</LeftSlotWrapper>}
      <Text>{text}</Text>
      {rightSlot && <RightSlotWrapper>{rightSlot}</RightSlotWrapper>}
    </StyledLink>
  );
};

export default MenuLink;
