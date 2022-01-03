import styled from "@emotion/styled/macro";
import * as mediaQueries from "style/mediaQueries";

export const Button = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  padding: 0.3rem;

  &:hover {
    background: ${({ theme }) => theme.headerSecondary};
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 0.8rem;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.header};
  padding: 0.7rem 1.2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  z-index: 10;
  position: relative;

  & > ${SectionWrapper}:nth-of-type(2) {
    margin-left: 2rem;
  }

  ${mediaQueries.md} {
    padding: 0.7rem 4.2rem;
  }
`;
