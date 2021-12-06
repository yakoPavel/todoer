import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import withFormikField from "../withFormikField/withFormikField";
import * as AuthPasswordInput from "./AuthPasswordInput";

const FormikAuthInput = withFormikField(
  AuthPasswordInput.AuthPasswordInputField,
);

export default {
  title:
    "Unauthorized app/Components/AuthPasswordInput/AuthPasswordInputWithFormik",
  component: FormikAuthInput,
} as ComponentMeta<typeof FormikAuthInput>;

const Template: ComponentStory<typeof FormikAuthInput> = (args) => {
  const { name, id } = args;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        margin: "auto",
      }}
    >
      <AuthPasswordInput.AuthPasswordInputWrapper>
        <AuthPasswordInput.AuthPasswordInputLabel htmlFor={name ?? id}>
          Password
        </AuthPasswordInput.AuthPasswordInputLabel>
        <FormikAuthInput {...args} />
      </AuthPasswordInput.AuthPasswordInputWrapper>
    </div>
  );
};

export const WithoutErrors = Template.bind({});
WithoutErrors.args = {
  name: "password",
  id: "password",
  useField: () => [{}, {}] as any,
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  ...WithoutErrors.args,
  useField: () => [{}, { touched: true, error: "Invalid password" }] as any,
};
