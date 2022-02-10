import React from "react";

import { AddItemForm } from "./AddItemForm";

import { useCreateProject } from "@/features/authorizedApp/api";
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

type AddProjectFormProps = {
  direction?: "above" | "below";
  triggerId?: string;
};

export const AddProjectForm = ({
  direction,
  triggerId,
}: AddProjectFormProps) => {
  const createProjectMutation = useCreateProject();

  /* We need this construction for the typescript type inference. */
  if (direction !== undefined && triggerId !== undefined) {
    return (
      <AddItemForm
        formTitle="Add project"
        closeModalAction={modalsUiActions.addProjectFormDismissed}
        openSectionAction={sideMenuUiActions.projectsSectionOpened}
        fieldsConfig={formFieldsConfig}
        createItemMutation={createProjectMutation}
        direction={direction}
        triggerId={triggerId}
      />
    );
  }

  return (
    <AddItemForm
      formTitle="Add project"
      closeModalAction={modalsUiActions.addProjectFormDismissed}
      openSectionAction={sideMenuUiActions.projectsSectionOpened}
      fieldsConfig={formFieldsConfig}
      createItemMutation={createProjectMutation}
      data-testid="addProjectForm"
    />
  );
};
