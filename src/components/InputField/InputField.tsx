import styled from "@emotion/styled/macro";

export const InputField = styled.input`
  border: 1px solid ${({ theme }) => theme.separators};
  background-color: ${({ theme }) => theme.background};
  border-radius: 5px;
  padding: 0.5rem;
  transition: all 0.2s;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.text};
  }
`;
