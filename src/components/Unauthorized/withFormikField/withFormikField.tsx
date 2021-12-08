import { InputProps, Text } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useField as formikUseField } from "formik";
import React from "react";

const ErrorMessage = styled(Text)`
  color: ${({ theme }) => theme.error};
  font-size: 1.4rem;
`;

export type InitialComponentProps = InputProps & {
  /** A name of the field. */
  name: string;
};

export type WrapperComponentProps = InitialComponentProps & {
  /**
   * A formik's `useField` implementation. It exists for testing purposes only.
   * Defaults to the real implementation of the aforementioned hook.
   * */
  useField?: typeof formikUseField;
};

export type WithFormikFieldReturn = {
  (props: WrapperComponentProps): JSX.Element;
  displayName: string;
};

/**
 * It is a HoC that injects the `formik`'s `useField` hook and an error
 * displaying functionality.
 *
 * @param Component - A component to wrap.
 * @param componentName - A name of the component that will be displayed in the
 * DevTools.
 */
const withFormikField = (
  Component: {
    (props: InitialComponentProps): JSX.Element | null;
    displayName?: string;
  },
  componentName = Component.displayName ?? Component.name,
): WithFormikFieldReturn => {
  const FormikField = ({
    useField = formikUseField,
    ...otherProps
  }: WrapperComponentProps) => {
    const [field, meta] = useField(otherProps.name);
    const theme = useTheme();
    const showError = Boolean(meta.touched && meta.error);

    return (
      <>
        <Component
          isInvalid={showError}
          errorBorderColor={theme.error}
          {...field}
          {...otherProps}
        />
        {showError && <ErrorMessage>{meta.error}</ErrorMessage>}
      </>
    );
  };

  FormikField.displayName = `withFormikField(${componentName})`;

  return FormikField;
};

export default withFormikField;
