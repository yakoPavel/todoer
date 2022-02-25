import React from "react";
import { useNavigate } from "react-router-dom";

import { signInThroughProvider } from "../../utils/signInThroughProvider";
import { AuthProviderButton } from "../AuthProviderButton/AuthProviderButton";

import { useLoadingState } from "@/context/LoadingContext";
import { useAsyncTask } from "@/hooks/useAsyncTask";
import { useIsMounted } from "@/hooks/useIsMounted";

export const AuthProviderButtons = () => {
  const navigate = useNavigate();
  const { isScreenLoading, setIsScreenLoading } = useLoadingState();
  const { isSuccess, isLoading, run } = useAsyncTask(signInThroughProvider);
  const checkIfMounted = useIsMounted();

  if (isSuccess) navigate("/", { replace: true });

  React.useEffect(() => {
    setIsScreenLoading((prevState) =>
      checkIfMounted() ? isLoading : prevState,
    );
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
