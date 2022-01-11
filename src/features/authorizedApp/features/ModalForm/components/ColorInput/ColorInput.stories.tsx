import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LABEL_COLORS } from "config/labelColors";
import React from "react";
import { Color } from "types";

import ColorInput from "./ColorInput";

export default {
  title: "Authorized app/ModalForm/ColorInput",
  component: ColorInput,
} as ComponentMeta<typeof ColorInput>;

const Template: ComponentStory<typeof ColorInput> = (args) => {
  const [colorValue, setColorValue] = React.useState<Color>(
    LABEL_COLORS[0].value,
  );

  return (
    <ColorInput
      {...args}
      value={colorValue}
      onChange={({ value }) => setColorValue(value)}
    />
  );
};

export const Default = Template.bind({});