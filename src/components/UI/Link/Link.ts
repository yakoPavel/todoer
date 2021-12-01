import styled from "@emotion/styled";

/**
 * Is is a styled link component.
 */
const Link = styled.a`
  color: ${({ theme }) => theme.main};
  font-size: 1.4rem;
  text-decoration: underline;
  cursor: pointer;
  border-radius: 2px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.focus};
  }
`;

export default Link;
