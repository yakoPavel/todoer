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
] as FormFieldsConfig;

const EditLabelForm = () => {
  const dispatch = useAppDispatch();

  // We should get this data from the state for this concrete label
  const dummyCurrentData = {
    "Label name": "My label",
    "Label color": "gold",
    "Add to favorites": true,
  } as Record<string, string | boolean>;

  formFieldsConfig.forEach((staticConfig) => {
    if (staticConfig.label in dummyCurrentData) {
      staticConfig.initialValue = dummyCurrentData[staticConfig.label];
    }
  });

  const onSubmit = (formValues: Record<string, string | boolean>) => {
    console.log("Edit label", formValues);
    dispatch(uiActions.editLabelFormDismissed());
  };

  const onDismiss = () => {
    dispatch(uiActions.editLabelFormDismissed());
  };

  return (
    <Form
      title="Edit label"
      formFieldsConfig={formFieldsConfig}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  );
};

export default EditLabelForm;
