import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

import { Button } from "@/components/Button/Button";

const StyledButton = styled(Button)`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.span`
  position: relative;
`;

const SpinnerWrapper = styled.span`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(200%, -50%);
  display: flex;
`;

type ConfirmButtonProps = React.ComponentPropsWithRef<typeof StyledButton> & {
  /** Whether or not the button in the loading state. */
  isLoading?: boolean;
  /** Whether or not the button is disabled. */
  isDisabled?: boolean;
};

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  children,
  isLoading = false,
  isDisabled = isLoading,
  ...otherProps
}) => {
  return (
    <StyledButton disabled={isDisabled} {...otherProps}>
      <ContentWrapper>
        {children}
        {isLoading && (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        )}
      </ContentWrapper>
    </StyledButton>
  );
};
