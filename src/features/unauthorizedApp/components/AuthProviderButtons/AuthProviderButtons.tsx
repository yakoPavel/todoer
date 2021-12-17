import useLoadingState from "context/LoadingContext";
import React from "react";

import AuthProviderButton from "../AuthProviderButton/AuthProviderButton";

const AuthProviderButtons = () => {
  const { isScreenLoading, setIsScreenLoading } = useLoadingState();

  return (
    <>
      <AuthProviderButton variant="google" isDisabled={isScreenLoading} />
      <AuthProviderButton variant="facebook" isDisabled={isScreenLoading} />
      <AuthProviderButton variant="apple" isDisabled={isScreenLoading} />
    </>
  );
};

export default AuthProviderButtons;
