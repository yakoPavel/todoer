import { useUiStateSetters } from "context/UiStateContext";
import React from "react";

import Form from "../Form/Form";

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
  const uiStateSetters = useUiStateSetters();

  const onSubmit = (formValues: Record<string, string | boolean>) => {
    console.log("New project", formValues);
    uiStateSetters.setAddProjectVisible(false);
  };

  const onDismiss = () => {
    uiStateSetters.setAddProjectVisible(false);
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
