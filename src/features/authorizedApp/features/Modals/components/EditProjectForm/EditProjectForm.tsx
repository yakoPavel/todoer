/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import React from "react";

import { FormValues } from "../../types";
import { Form } from "../Form/Form";

import { useEditProject } from "@/features/authorizedApp/api/editProject";
import { actions as uiActions } from "@/features/authorizedApp/store/slices/ui";
import { useAppDispatch } from "@/hooks/storeHooks";

type FormFieldsConfig = React.ComponentPropsWithoutRef<
  typeof Form
>["formFieldsConfig"];

const formFieldsConfig: FormFieldsConfig = [
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

type EditProjectFormProps = {
  projectId: string;
};

export const EditProjectForm = ({ projectId }: EditProjectFormProps) => {
  const dispatch = useAppDispatch();
  const editProjectMutation = useEditProject();

  // We should get this data from the state for this concrete label
  const dummyCurrentData = {
    Name: "My label",
    Color: "green",
    "Add to favorites": false,
  } as Record<string, string | boolean>;

  formFieldsConfig.forEach((staticConfig) => {
    if (staticConfig.label in dummyCurrentData) {
      staticConfig.initialValue = dummyCurrentData[staticConfig.label];
    }
  });

  const onSubmit = (formValues: FormValues<typeof formFieldsConfig>) => {
    editProjectMutation.mutate({ id: projectId, ...formValues });
    dispatch(uiActions.editProjectFormDismissed());
  };

  const onDismiss = () => {
    dispatch(uiActions.editProjectFormDismissed());
  };

  return (
    <Form
      title="Edit project"
      formFieldsConfig={formFieldsConfig}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  );
};
