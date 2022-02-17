import styled from "@emotion/styled/macro";

export const Form = styled.form`
  width: 100%;
`;

export const EditingAreaWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.separators};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 2rem;
  cursor: text;

  &:focus-within {
    border-color: ${({ theme }) => theme.text};
  }
`;

export const TitleField = styled.input`
  outline: none;
  font-weight: 700;
  background: ${({ theme }) => theme.background};

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const DescriptionField = styled.textarea`
  resize: none;
  outline: none;
  background: ${({ theme }) => theme.background};

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 1rem;

  & > button:not(:first-of-type) {
    margin-left: 1rem;
  }
`;
