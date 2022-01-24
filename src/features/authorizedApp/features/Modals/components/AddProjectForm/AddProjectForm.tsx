import React from "react";

import { FormValues } from "../../types";
import { Form } from "../Form/Form";

import { useCreateProject } from "@/features/authorizedApp/api/createProject";
import { actions as uiActions } from "@/features/authorizedApp/store/slices/ui";
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

  const onSubmit = ({
    name,
    color,
    isFavorite,
  }: FormValues<typeof formFieldsConfig>) => {
    createProjectMutation.mutate({
      color,
      name,
      isFavorite,
    });
    dispatch(uiActions.addProjectFormDismissed());
  };

  const onDismiss = () => {
    dispatch(uiActions.addProjectFormDismissed());
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
