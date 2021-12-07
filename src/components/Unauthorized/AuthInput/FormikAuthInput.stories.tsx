import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { FormikAuthInput } from "./AuthInput";

export default {
  title: "Unauthorized app/Components/AuthInput/AuthInputWithFormik",
  component: FormikAuthInput,
} as ComponentMeta<typeof FormikAuthInput>;

const Template: ComponentStory<typeof FormikAuthInput> = (args) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        margin: "auto",
      }}
    >
      <FormikAuthInput type="email" {...args} />
    </div>
  );
};

export const WithoutErrors = Template.bind({});
WithoutErrors.args = {
  name: "email",
  id: "email",
  labelText: "Email",
  useFieldImplementation: () => [{}, {}] as any,
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  ...WithoutErrors.args,
  useFieldImplementation: () =>
    [{}, { touched: true, error: "Invalid email" }] as any,
};
