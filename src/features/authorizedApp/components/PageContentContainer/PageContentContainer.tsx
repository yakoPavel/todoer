import styled from "@emotion/styled/macro";

export const PageContentContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  width: 100%;
  height: calc(100vh - var(--header-height, 0) - 1px);
`;
