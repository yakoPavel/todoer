import React from "react";

import { LabelItem } from "../LabelItem/LabelItem";

import { useFilteredLabels } from "./hooks/useFilteredLabels";
import * as Styled from "./styles";

import { useEditTask } from "@/features/authorizedApp/api/editTask";
import { useLabels } from "@/features/authorizedApp/api/getLabels";
import { useTasks } from "@/features/authorizedApp/api/getTasks";
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
    <>
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
      </Styled.ListContainer>
    </>
  );
};

type LabelsListProps = {
  /** An id of the task this list shows for. */
  taskId: string;
};

export const LabelsList = ({ taskId }: LabelsListProps) => {
  const labelsData = useLabels();
  const tasksData = useTasks();

  const editTaskMutation = useEditTask();

  if (labelsData.isError || tasksData.isError) {
    return (
      <Styled.Container>
        <ErrorScreen />
      </Styled.Container>
    );
  }

  if (!labelsData.isSuccess || !tasksData.isSuccess) {
    return (
      <Styled.Container>
        <Spinner />
      </Styled.Container>
    );
  }

  const taskData = tasksData.data.find((task) => task.id === taskId);
  if (!taskData) {
    throw new Error(`The task with ${taskId} id wasn't found!`);
  }

  const onCheckedStateChange = (labelId: string, isChecked: boolean) => {
    editTaskMutation.mutate({
      id: taskId,
      labelId: isChecked ? labelId : null,
    });
  };

  return (
    <Styled.Container data-testid="labelsList">
      {labelsData.data && (
        <LabelsListContent
          labels={labelsData.data}
          checkedLabelId={taskData.labelId}
          onCheckedStateChange={onCheckedStateChange}
        />
      )}
    </Styled.Container>
  );
};
