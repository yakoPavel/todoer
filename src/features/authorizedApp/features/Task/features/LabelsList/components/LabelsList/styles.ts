import styled from "@emotion/styled/macro";

export const Container = styled.div`
  width: 27.5rem;
  max-height: 30rem;
  min-height: 5rem;

  display: flex;
  flex-direction: column;

  border: 1px solid ${({ theme }) => theme.separators};
  border-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;
  background-color: ${({ theme }) => theme.background};
`;

export const SearchField = styled.input`
  border-bottom: 1px solid ${({ theme }) => theme.separators};
  background-color: ${({ theme }) => theme.background};
  padding: 0.5rem 1rem;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const ListContainer = styled.ul`
  overflow-y: auto;
`;
