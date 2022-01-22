import React from "react";
import { useNavigate } from "react-router-dom";

import { signInThroughProvider } from "../../utils/signInThroughProvider";
import AuthProviderButton from "../AuthProviderButton/AuthProviderButton";

import useLoadingState from "@/context/LoadingContext";
import { useAsyncTask } from "@/hooks/useAsyncTask";

const AuthProviderButtons = () => {
  const navigate = useNavigate();
  const { isScreenLoading, setIsScreenLoading } = useLoadingState();
  const { isSuccess, isLoading, run } = useAsyncTask(signInThroughProvider);

  if (isSuccess) navigate("/", { replace: true });

  React.useEffect(() => {
    setIsScreenLoading(isLoading);
  });

  return (
    <>
      <AuthProviderButton
        onClick={() => run("google")}
        variant="google"
        isDisabled={isScreenLoading}
        isLoading={isLoading}
      />
      <AuthProviderButton
        onClick={() => run("facebook")}
        variant="facebook"
        isDisabled={isScreenLoading}
        isLoading={isLoading}
      />
      <AuthProviderButton
        onClick={() => run("yahoo")}
        variant="yahoo"
        isDisabled={isScreenLoading}
        isLoading={isLoading}
      />
    </>
  );
};

export default AuthProviderButtons;
