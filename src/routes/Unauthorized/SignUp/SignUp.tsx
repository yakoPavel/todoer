import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Divider from "components/UI/Divider/Divider";
import StyledLink from "components/UI/StyledLink/StyledLink";
import AuthProviderButton from "components/Unauthorized/AuthProviderButton/AuthProviderButton";
import SignUpWithPasswordForm from "components/Unauthorized/Form/SignUpWithPasswordForm";
import UnauthorizedContainer from "components/Unauthorized/UnauthorizedContainer/UnauthorizedContainer";
import React from "react";

const BottomDivider = styled(Divider)`
  margin: 2rem 0;
`;

const SignUp: React.FC = () => {
  return (
    <UnauthorizedContainer>
      <AuthProviderButton variant="google" />
      <AuthProviderButton variant="facebook" />
      <AuthProviderButton variant="apple" />

      <Divider inBetweenText="OR" />

      <SignUpWithPasswordForm />

      <BottomDivider />
      <Text fontSize="sm" textAlign="center">
        Already signed up? <StyledLink to="/">Log in</StyledLink>
      </Text>
    </UnauthorizedContainer>
  );
};

export default SignUp;
