import { useUiStateSetters } from "context/UiStateContext";
import React from "react";

import Form from "../Form/Form";

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
  const uiStateSetters = useUiStateSetters();

  const onSubmit = (formValues: Record<string, string | boolean>) => {
    console.log("New label", formValues);
    uiStateSetters.setAddLabelVisible(false);
  };

  const onDismiss = () => {
    uiStateSetters.setAddLabelVisible(false);
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
