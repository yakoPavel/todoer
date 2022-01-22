/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { useOnDragEnd } from "../../hooks/useOnDragEnd";

import { DragAndDrop } from "./DragAndDrop";

import { themeSwitcherArgType } from "@/storybook/commonArgTypes";

export default {
  title: "Authorized app/DragAndDrop",
  component: DragAndDrop,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof DragAndDrop>;

const ComponentToDrag = ({ id }: { id: number }) => (
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

const initialDraggables = [
  {
    component: <ComponentToDrag id={1} />,
    id: "COMPONENT_1",
  },
  {
    component: <ComponentToDrag id={2} />,
    id: "COMPONENT_2",
  },
  {
    component: <ComponentToDrag id={3} />,
    id: "COMPONENT_3",
  },
  {
    component: <ComponentToDrag id={4} />,
    id: "COMPONENT_4",
  },
  {
    component: <ComponentToDrag id={5} />,
    id: "COMPONENT_5",
  },
];

const Template: ComponentStory<typeof DragAndDrop> = (args) => {
  const { draggables, onDragEnd } = useOnDragEnd(initialDraggables);

  return (
    <DragAndDrop {...args} onDragEnd={onDragEnd} draggables={draggables} />
  );
};

export const Default = Template.bind({});
Default.args = {
  mainId: "SOME_MAIN_ID",
};
