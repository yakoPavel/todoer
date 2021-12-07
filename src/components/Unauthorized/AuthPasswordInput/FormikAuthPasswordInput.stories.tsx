import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { FormikAuthPasswordInput } from "./AuthPasswordInput";

export default {
  title:
    "Unauthorized app/Components/AuthPasswordInput/AuthPasswordInputWithFormik",
  component: FormikAuthPasswordInput,
} as ComponentMeta<typeof FormikAuthPasswordInput>;

const Template: ComponentStory<typeof FormikAuthPasswordInput> = (args) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        margin: "auto",
      }}
    >
      <FormikAuthPasswordInput {...args} />
    </div>
  );
};

export const WithoutErrors = Template.bind({});
WithoutErrors.args = {
  name: "password",
  id: "password",
  useFieldImplementation: () => [{}, {}] as any,
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  ...WithoutErrors.args,
  useFieldImplementation: () =>
    [{}, { touched: true, error: "Invalid password" }] as any,
};
