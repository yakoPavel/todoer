/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import React from "react";

import Form from "../Form/Form";

import { useAppDispatch } from "@/hooks/storeHooks";
import { actions as uiActions } from "@/store/slices/ui";

type FormFieldsConfig = React.ComponentPropsWithoutRef<
  typeof Form
>["formFieldsConfig"];

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
] as FormFieldsConfig;

const EditProjectForm = () => {
  const dispatch = useAppDispatch();

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

  const onSubmit = (formValues: Record<string, string | boolean>) => {
    console.log("Edit project", formValues);
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

export default EditProjectForm;
