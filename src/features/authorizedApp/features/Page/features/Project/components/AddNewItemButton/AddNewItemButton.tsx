import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1.75rem;
  width: 100%;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.focus};
    outline-offset: -2px;
    border-radius: 5px;
    z-index: 2;
  }
`;

const ButtonText = styled(Text)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.6rem;

  @media screen and (hover: hover) {
    ${Button}:hover & {
      color: ${({ theme }) => theme.main};
    }
  }
`;

const IconContainer = styled.div`
  border-radius: 50%;
  color: ${({ theme }) => theme.main};
  margin-right: 1.5rem;

  @media screen and (hover: hover) {
    ${Button}:hover & {
      background-color: ${({ theme }) => theme.main};
      color: ${({ theme }) => theme.textAlt};
    }
  }
`;

type AddNewItemButtonProps = Omit<
  React.ComponentPropsWithRef<"button">,
  "children"
>;

export const AddNewItemButton = (props: AddNewItemButtonProps) => {
  return (
    <Button type="button" {...props}>
      <IconContainer aria-hidden>
        <AiOutlinePlus size="1.7rem" />
      </IconContainer>
      <ButtonText>Add task</ButtonText>
    </Button>
  );
};
