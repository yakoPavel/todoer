import { Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Divider from "components/UI/Divider/Divider";
import StyledLink from "components/UI/StyledLink/StyledLink";
import RecoveryForm from "components/Unauthorized/Form/Form";
import UnauthorizedContainer from "components/Unauthorized/UnauthorizedContainer/UnauthorizedContainer";
import React from "react";

const BottomDivider = styled(Divider)`
  margin: 2rem 0;
`;

const SignUp: React.FC = () => {
  return (
    <UnauthorizedContainer>
      <Heading as="h1" fontSize="2xl">
        Forgot your password?
      </Heading>
      <Text whiteSpace="normal" fontSize="sm">
        To reset your password, please enter the email address of your account.
      </Text>
      <RecoveryForm variant="passwordRecovery" />
      <BottomDivider />
      <Text fontSize="sm" textAlign="center">
        <StyledLink to="/">Go to login</StyledLink>
      </Text>
    </UnauthorizedContainer>
  );
};

export default SignUp;
