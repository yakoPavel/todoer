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

import { useLabel, useTask } from "@/features/authorizedApp/api";

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
  const taskData = useTask({ itemId: taskId });

  const taskHasLabel = Boolean(taskData.data && taskData.data.labelId);

  const labelData = useLabel({
    itemId: taskData.data?.labelId as string,
    config: {
      enabled: taskHasLabel,
    },
  });

  if (!taskData.data || (taskHasLabel && !labelData.data)) return null;

  const labelColor = labelData.data?.color ?? null;

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
