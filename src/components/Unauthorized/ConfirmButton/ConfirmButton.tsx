import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import Button from "components/UI/Button/Button";
import React from "react";

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

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
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

export default ConfirmButton;
