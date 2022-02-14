/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { useDraggablesState } from "../../hooks/useDraggablesState";

import { DragAndDrop } from "./DragAndDrop";

import { themeSwitcherArgType } from "@/storybook/commonArgTypes";

export default {
  title: "Authorized app/DragAndDrop",
  component: DragAndDrop,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof DragAndDrop>;

const ComponentToDrag = ({ id }: { id: string }) => (
  <div
    css={css`
      border: 1px solid lightgray;
      padding: 8px;
      background: white;
    `}
  >
    Component {id}
  </div>
);

const Template: ComponentStory<typeof DragAndDrop> = (args) => {
  const { draggables, onDragEnd } = useDraggablesState({
    componentGenerator: ({ id }) => <ComponentToDrag id={id} />,
    data: Array.from({ length: 5 }, (_, index) => ({ id: index.toString() })),
  });

  return (
    <DragAndDrop {...args} onDragEnd={onDragEnd} draggables={draggables} />
  );
};

export const Default = Template.bind({});
Default.args = {
  mainId: "SOME_MAIN_ID",
};
