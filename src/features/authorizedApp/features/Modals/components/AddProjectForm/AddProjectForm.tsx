import React from "react";

import Form from "../Form/Form";

import { useAppDispatch } from "@/hooks/storeHooks";
import { actions as uiActions } from "@/store/slices/ui";

const formFieldsConfig = [
  {
    label: "Name" as const,
    type: "text" as const,
    required: true,
  },
  {
    label: "Color" as const,
    type: "color" as const,
    required: true,
  },
  {
    label: "Add to favorites" as const,
    type: "switch" as const,
  },
];

const AddProjectForm = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (formValues: Record<string, string | boolean>) => {
    console.log("New project", formValues);
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

export default AddProjectForm;
