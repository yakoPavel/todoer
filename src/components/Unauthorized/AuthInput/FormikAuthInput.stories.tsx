import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import withFormikField from "../withFormikField/withFormikField";
import * as AuthInput from "./AuthInput";

const FormikAuthInput = withFormikField(AuthInput.AuthInputField);

export default {
  title: "Unauthorized app/Components/AuthInput/AuthInputWithFormik",
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
      <AuthInput.AuthInputWrapper>
        <AuthInput.AuthInputLabel htmlFor={name ?? id}>
          Email
        </AuthInput.AuthInputLabel>
        <FormikAuthInput {...args} />
      </AuthInput.AuthInputWrapper>
    </div>
  );
};

export const WithoutErrors = Template.bind({});
WithoutErrors.args = {
  name: "email",
  id: "email",
  useField: () => [{}, {}] as any,
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  ...WithoutErrors.args,
  useField: () => [{}, { touched: true, error: "Invalid email" }] as any,
};
