import React from "react";
import FocusLock from "react-focus-lock";

import { LabelItem } from "../LabelItem/LabelItem";

import { useFilteredLabels } from "./hooks/useFilteredLabels";
import * as Styled from "./styles";

import { useLabels, useEditTask, useTask } from "@/features/authorizedApp/api";
import { ErrorScreen } from "@/features/authorizedApp/components/ErrorScreen/ErrorScreen";
import { Spinner } from "@/features/authorizedApp/components/Spinner/Spinner";
import { Label } from "@/features/authorizedApp/types";

type LabelsListContentProps = {
  onCheckedStateChange: (labelId: string, isChecked: boolean) => void;
  labels: Label[];
  checkedLabelId?: string;
};
const LabelsListContent = ({
  labels,
  checkedLabelId,
  onCheckedStateChange,
}: LabelsListContentProps) => {
  const { filteredLabels, onFilterValueChange } = useFilteredLabels(labels);

  return (
    <FocusLock>
      <Styled.SearchField
        onChange={onFilterValueChange}
        placeholder="Type a label"
        aria-label="Type a label for search"
      />
      <Styled.ListContainer>
        {filteredLabels.map(({ color, name, id }) => (
          <LabelItem
            color={color}
            title={name}
            isChecked={checkedLabelId === id}
            onChange={onCheckedStateChange.bind(null, id)}
            key={id}
          />
        ))}
        {filteredLabels.length === 0 && (
          <Styled.NotFoundText>Label not found</Styled.NotFoundText>
        )}
      </Styled.ListContainer>
    </FocusLock>
  );
};

type LabelsListProps = {
  /** An id of the task this list shows for. */
  taskId: string;
};

export const LabelsList = ({ taskId }: LabelsListProps) => {
  const labelsData = useLabels();
  const taskData = useTask({ itemId: taskId });

  const editTaskMutation = useEditTask();

  if (labelsData.isError || taskData.isError) {
    return (
      <Styled.Container>
        <ErrorScreen />
      </Styled.Container>
    );
  }

  if (!labelsData.data || !taskData.data) {
    return (
      <Styled.Container>
        <Spinner />
      </Styled.Container>
    );
  }

  const onCheckedStateChange = (labelId: string, isChecked: boolean) => {
    editTaskMutation.mutate({
      id: taskId,
      labelId: isChecked ? labelId : null,
    });
  };

  return (
    <Styled.Container data-testid="labelsList">
      <LabelsListContent
        labels={labelsData.data}
        checkedLabelId={taskData.data.labelId}
        onCheckedStateChange={onCheckedStateChange}
      />
    </Styled.Container>
  );
};
