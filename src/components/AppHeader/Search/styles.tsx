import { css } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import { AiOutlineSearch, MdOutlineClear } from "react-icons/all";
import * as mediaQueries from "style/mediaQueries";

const INPUT_HORIZONTAL_PADDING = 4;
const BUTTON_SIZE = 2.4;
const BUTTON_MARGIN_FROM_BORDER = (INPUT_HORIZONTAL_PADDING - BUTTON_SIZE) / 2;

export const SearchContainer = styled.div`
  position: relative;
`;

const buttonsCommonStyle = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: ${BUTTON_SIZE}rem;
  width: ${BUTTON_SIZE}rem;
`;

export const SearchIcon = styled(AiOutlineSearch)`
  ${buttonsCommonStyle}
  left: ${BUTTON_MARGIN_FROM_BORDER}rem;
  color: ${({ theme }) => theme.textAlt};
`;

export const ClearIcon = styled(MdOutlineClear)`
  height: 80%;
  width: 80%;
  color: ${({ theme }) => theme.textSecondary};
`;

export const ClearButton = styled.button`
  ${buttonsCommonStyle}
  border-radius: 3px;

  right: ${BUTTON_MARGIN_FROM_BORDER}rem;
  align-items: center;
  justify-content: center;
  display: none;

  &:hover {
    background: ${({ theme }) => theme.headerTertiary};
  }

  &:hover ${ClearIcon} {
    color: ${({ theme }) => theme.textSecondaryActive};
  }
`;

export const Input = styled.input`
  background: ${({ theme }) => theme.headerSecondary};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  padding: 0.6rem ${INPUT_HORIZONTAL_PADDING}rem;
  border-radius: 3px;
  transition: background-color 0.1s linear;

  &::placeholder {
    color: transparent;
  }

  &:hover {
    background: ${({ theme }) => theme.background};
  }

  &:hover ~ ${SearchIcon}, &:focus ~ ${SearchIcon} {
    color: ${({ theme }) => theme.text};
  }

  &:focus {
    width: 40rem;
    background: ${({ theme }) => theme.background};
    outline: none;
    z-index: 10;
    padding: 0.6rem 0.6rem;
  }

  &:focus ~ ${SearchIcon} {
    display: none;
  }

  &:focus ~ ${ClearButton} {
    display: flex;
  }

  ${mediaQueries.md} {
    &:focus {
      padding: 0.6rem ${INPUT_HORIZONTAL_PADDING}rem;
    }

    &:focus ~ ${SearchIcon} {
      display: unset;
    }

    &::placeholder {
      color: ${({ theme }) => theme.textAlt};
    }

    &:hover::placeholder,
    &:focus::placeholder {
      color: ${({ theme }) => theme.textSecondary};
    }
  }
`;

export const Menu = styled.ul`
  position: absolute;
  bottom: -0.3rem;
  left: 0;
  transform: translateY(100%);
  width: 100%;
  max-height: 50vh;
  overflow-y: scroll;

  background: ${({ theme }) => theme.background};
  list-style: none;
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.05),
    0 20px 25px -5px rgba(0, 0, 0, 0.05);
`;

export const Item = styled.li`
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.backgroundTertiary};
  }
`;
