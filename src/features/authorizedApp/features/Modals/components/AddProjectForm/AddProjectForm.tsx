import React from "react";

import { FormValues } from "../../types";
import { Form } from "../Form/Form";

import { useCreateProject } from "@/features/authorizedApp/api/createProject";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { actions as sideMenuUiActions } from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppDispatch } from "@/hooks/storeHooks";

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
  const dispatch = useAppDispatch();
  const createProjectMutation = useCreateProject();

  const onSubmit = (formValues: FormValues<typeof formFieldsConfig>) => {
    createProjectMutation.mutate(formValues);
    dispatch(modalsUiActions.addProjectFormDismissed());

    // Open the side menu section if it is closed. Deffer it to the next tick
    // so that the new project is already in the list.
    setTimeout(() => dispatch(sideMenuUiActions.projectsSectionOpened()), 0);
  };

  const onDismiss = () => {
    dispatch(modalsUiActions.addProjectFormDismissed());
  };

  return (
    <Form
      title="Add project"
      formFieldsConfig={formFieldsConfig}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  );
};
