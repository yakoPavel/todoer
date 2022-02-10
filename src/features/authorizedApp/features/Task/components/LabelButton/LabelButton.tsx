import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled/macro";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import React from "react";
import { MdLabel, MdLabelOutline } from "react-icons/md";

import { LabelsList } from "../../features/LabelsList";

import { useLabels, useTasks } from "@/features/authorizedApp/api";
import { Label, Task } from "@/features/authorizedApp/types";

type GetLabelColorParams = {
  tasks: Task[];
  labels: Label[];
  taskId: string;
};
function getLabelColor({ taskId, tasks, labels }: GetLabelColorParams) {
  const task = tasks.find((currTask) => currTask.id === taskId);
  if (!task) {
    throw new Error(`There is no task with the ${taskId} id`);
  }

  if (!task.labelId) return null;

  const label = labels.find((currLabel) => currLabel.id === task.labelId);
  if (!label) {
    throw new Error(
      `There is no label with the ${taskId} id. This id was specified in the 'taskData.labelId' property.`,
    );
  }

  return label.color;
}

const StyledButton = styled(PopoverTrigger, {
  shouldForwardProp: isPropValid,
})<{
  labelColor: string | null;
}>`
  color: ${({ labelColor, theme }) =>
    labelColor ? labelColor : theme.textSecondaryActive};

  cursor: pointer;
  border-radius: 5px;

  @media screen and (hover: hover) {
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.25);
    }
  }
`;

type LabelButtonProps = {
  /** An id of the task this label belongs. */
  taskId: string;
};

export const LabelButton: React.FC<LabelButtonProps> = ({
  taskId,
}: LabelButtonProps) => {
  const tasksData = useTasks();
  const labelsData = useLabels();

  if (!tasksData.data || !labelsData.data) return null;

  const labelColor = getLabelColor({
    labels: labelsData.data,
    tasks: tasksData.data,
    taskId,
  });

  return (
    <Popover>
      <StyledButton
        labelColor={labelColor}
        type="button"
        aria-label="Change or set label"
      >
        {labelColor ? <MdLabel size="2rem" /> : <MdLabelOutline size="2rem" />}
      </StyledButton>
      <PopoverContent>
        <LabelsList taskId={taskId} />
      </PopoverContent>
    </Popover>
  );
};
