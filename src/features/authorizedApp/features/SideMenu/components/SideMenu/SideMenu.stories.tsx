import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { themeSwitcherArgType } from "storybook/commonArgTypes";

import SideMenu from "./SideMenu";

export default {
  title: "Authorized app/SideMenu/SideMenu",
  component: SideMenu,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof SideMenu>;

const Template: ComponentStory<typeof SideMenu> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prevValue) => !prevValue)}
      >
        Toggle the menu
      </button>
      <SideMenu {...args} isOpen={isOpen} />
    </>
  );
};

export const Default = Template.bind({});
