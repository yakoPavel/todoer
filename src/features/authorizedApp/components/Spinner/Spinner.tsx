import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

const Wrapper = styled.div<{ withColoredOverlay: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.main};
  background-color: ${({ withColoredOverlay }) =>
    withColoredOverlay ? "rgba(0, 0, 0, 0.5)" : "transparent"};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

type SpinnerProps = React.ComponentProps<typeof ChakraSpinner> & {
  withColoredOverlay?: boolean;
};

export const Spinner: React.FC<SpinnerProps> = ({
  withColoredOverlay = false,
  ...otherProps
}: SpinnerProps) => {
  return (
    <Wrapper withColoredOverlay={withColoredOverlay}>
      <ChakraSpinner {...otherProps} />
    </Wrapper>
  );
};
