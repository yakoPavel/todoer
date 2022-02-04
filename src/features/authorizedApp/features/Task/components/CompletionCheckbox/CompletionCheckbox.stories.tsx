import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { CompletionCheckbox } from "./CompletionCheckbox";

export default {
  title: "Authorized app/Task/CompletionCheckbox",
  component: CompletionCheckbox,
} as ComponentMeta<typeof CompletionCheckbox>;

const Template: ComponentStory<typeof CompletionCheckbox> = (args) => {
  const [isChecked, toggleIsChecked] = React.useReducer(
    (prevValue) => !prevValue,
    false,
  );

  console.log(isChecked);

  return (
    <CompletionCheckbox
      {...args}
      onChange={toggleIsChecked}
      isChecked={isChecked}
    />
  );
};

export const Default = Template.bind({});
