import React from "react";

import { EditItemForm } from "./EditItemForm";

import { useEditProject, useProjects } from "@/features/authorizedApp/api";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";

const formFieldsConfig = [
  {
    label: "Name" as const,
    type: "text" as const,
    name: "name" as const,
    required: true,
  },
  {
    label: "Color" as const,
    type: "color" as const,
    name: "color" as const,
    required: true,
  },
  {
    label: "Add to favorites" as const,
    type: "switch" as const,
    name: "isFavorite" as const,
  },
];

type EditProjectFormProps = { projectId: string };

export const EditProjectForm = ({ projectId }: EditProjectFormProps) => {
  const editProjectMutation = useEditProject();
  const projectsInfo = useProjects();

  return (
    <EditItemForm
      itemId={projectId}
      formTitle="Edit project"
      closeModalAction={modalsUiActions.editProjectFormDismissed}
      editItemMutation={editProjectMutation}
      fieldsConfig={formFieldsConfig}
      itemsInfo={projectsInfo}
      data-testid="editProjectForm"
    />
  );
};
