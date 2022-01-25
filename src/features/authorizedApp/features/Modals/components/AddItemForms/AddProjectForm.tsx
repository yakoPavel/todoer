import React from "react";

import { AddItemForm } from "./AddItemForm";

import { useCreateProject } from "@/features/authorizedApp/api/createProject";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { actions as sideMenuUiActions } from "@/features/authorizedApp/store/slices/sideMenuUi";

const formFieldsConfig = [
  {
    label: "Name" as const,
    name: "name" as const,
    type: "text" as const,
    required: true,
  },
  {
    label: "Color" as const,
    name: "color" as const,
    type: "color" as const,
    required: true,
  },
  {
    label: "Add to favorites" as const,
    name: "isFavorite" as const,
    type: "switch" as const,
  },
];

export const AddProjectForm = () => {
  const createProjectMutation = useCreateProject();

  return (
    <AddItemForm
      closeModalAction={modalsUiActions.addProjectFormDismissed}
      openSectionAction={sideMenuUiActions.projectsSectionOpened}
      fieldsConfig={formFieldsConfig}
      createItemMutation={createProjectMutation}
    />
  );
};
