import styled from "@emotion/styled/macro";
import Button from "components/Button/Button";

export const Card = styled.section`
  background: ${({ theme }) => theme.modalFormBackground};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 30rem;
  max-width: 98%;
  overflow: hidden;
  color: ${({ theme }) => theme.text};
`;

export const TitleContainer = styled.div`
  background: ${({ theme }) => theme.modalFormTitleBackground};
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.separators};
`;

export const FormContainer = styled.div`
  padding: 1.5rem;
`;

export const ControlsContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.separators};
  padding-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

export const ControlButton = styled(Button)`
  padding: 0.5rem 1.5rem;

  &[type="submit"] {
    margin-left: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
