import { Divider as ChakraDivider, Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

type DividerProps = React.ComponentProps<typeof ChakraDivider> & {
  inBetweenText?: string;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DividerPart = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.separators};
`;

const InBetweenText = styled(Text)`
  margin: 0 1.5rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const Divider: React.FC<DividerProps> = ({ inBetweenText, ...otherProps }) => {
  if (!inBetweenText) return <Divider {...otherProps} />;

  return (
    <Wrapper>
      <DividerPart />
      <InBetweenText>{inBetweenText}</InBetweenText>
      <DividerPart />
    </Wrapper>
  );
};

export default Divider;
