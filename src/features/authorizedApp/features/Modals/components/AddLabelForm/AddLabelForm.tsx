import React from "react";

import Form from "../Form/Form";

import { useAppDispatch } from "@/hooks/storeHooks";
import { actions as uiActions } from "@/store/slices/ui";

const formFieldsConfig = [
  {
    label: "Label name" as const,
    type: "text" as const,
    required: true,
  },
  {
    label: "Label color" as const,
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
    console.log("New label", formValues);
    dispatch(uiActions.addLabelFormDismissed());
  };

  const onDismiss = () => {
    dispatch(uiActions.addLabelFormDismissed());
  };

  return (
    <Form
      title="Add label"
      formFieldsConfig={formFieldsConfig}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  );
};

export default AddProjectForm;
