import { Divider as ChakraDivider, Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

type DividerProps = React.ComponentProps<typeof ChakraDivider> & {
  /** A text that will be placed in the middle of the divider. */
  inBetweenText?: string;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DividerPart = styled.hr`
  width: 100%;
  background-color: ${({ theme }) => theme.separators};
`;

const InBetweenText = styled(Text)`
  margin: 0 1.5rem;
  color: ${({ theme }) => theme.textSecondary};
  white-space: nowrap;
`;

const WholeDivider = styled(ChakraDivider)`
  background-color: ${({ theme }) => theme.separators};
`;

/**
 * It is a component intended to be used as a divider.
 */
export const Divider: React.FC<DividerProps> = ({
  inBetweenText,
  ...otherProps
}) => {
  if (!inBetweenText) return <WholeDivider {...otherProps} />;

  return (
    <Wrapper>
      <DividerPart />
      <InBetweenText>{inBetweenText}</InBetweenText>
      <DividerPart />
    </Wrapper>
  );
};
