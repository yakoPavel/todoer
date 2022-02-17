import styled from "@emotion/styled/macro";

import { Button as OriginalButton } from "@/components/Button/Button";
import { InputField as OriginalInputField } from "@/components/InputField/InputField";

export const Heading = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;

  @media (hover: hover) {
    border-radius: 5px;
    padding: 0.2rem 0.5rem;

    &:hover {
      background-color: ${({ theme }) => theme.backgroundTertiary};
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ControlsWrapper = styled.div`
  margin-top: 1rem;
`;

export const Button = styled(OriginalButton)`
  width: 8rem;
`;

export const SaveButton = styled(Button)`
  margin-right: 1rem;
`;

export const InputField = styled(OriginalInputField)`
  font-size: 2.2rem;
  font-weight: 700;
  width: 100%;
`;
