import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";

import { HomeImage as OriginalHomeImage } from "../HomeImage/HomeImage";

import { Button as OriginalButton } from "@/components/Button/Button";

export const Greeting = styled(Text)`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

export const SecondaryGreeting = styled(Text)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export const HomeImage = styled(OriginalHomeImage)`
  margin: 2rem 0 3rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 25rem;
  margin-top: 3rem;
  justify-content: space-between;
`;

export const Button = styled(OriginalButton)`
  font-size: 1.5rem;
`;
