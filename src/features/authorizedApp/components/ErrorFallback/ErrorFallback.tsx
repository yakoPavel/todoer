import React from "react";
import { FallbackProps } from "react-error-boundary";

import { ErrorScreen } from "../ErrorScreen/ErrorScreen";

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return <ErrorScreen tryAgainButton onTryAgainClick={resetErrorBoundary} />;
};
