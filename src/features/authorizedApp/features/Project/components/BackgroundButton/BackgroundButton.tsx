import styled from "@emotion/styled/macro";

export const BackgroundButton = styled.button`
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.textSecondary};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiary};
    color: ${({ theme }) => theme.text};
  }
`;
