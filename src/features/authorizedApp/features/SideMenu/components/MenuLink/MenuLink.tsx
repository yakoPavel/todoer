import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

export const MenuLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.4em 0;
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
  width: 4rem;
  display: flex;
  justify-content: center;
`;

const RightSlotWrapper = styled.div`
  flex: 1;
  display: flex;
  padding-right: calc(15% - 2.2rem);
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  flex-grow: 6.5;
`;

export type MenuLinkProps = Omit<
  React.ComponentPropsWithoutRef<"a">,
  "children"
> & {
  /** Link text. It will be placed in the middle. */
  text: string;
  /** A component that will be placed on the left. */
  leftSlot?: React.ReactNode;
  /** A component that will be placed on the right. */
  rightSlot?: React.ReactNode;
} & LinkProps;

export const MenuLink = React.forwardRef<HTMLDivElement, MenuLinkProps>(
  ({ rightSlot, leftSlot, text, ...otherProps }, ref) => {
    return (
      <MenuLinkWrapper ref={ref} data-testid="menuLinkWrapper">
        <LeftSlotWrapper>{leftSlot}</LeftSlotWrapper>
        <StyledLink {...otherProps}>
          <Text>{text}</Text>
        </StyledLink>
        <RightSlotWrapper>{rightSlot}</RightSlotWrapper>
      </MenuLinkWrapper>
    );
  },
);

MenuLink.displayName = "MenuLink";
