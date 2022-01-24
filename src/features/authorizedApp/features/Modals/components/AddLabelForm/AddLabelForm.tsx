import React from "react";

import { FormValues } from "../../types";
import { Form } from "../Form/Form";

import { useCreateLabel } from "@/features/authorizedApp/api/createLabel";
import { actions as uiActions } from "@/features/authorizedApp/store/slices/ui";
import { useAppDispatch } from "@/hooks/storeHooks";

const formFieldsConfig = [
  {
    label: "Label name" as const,
    name: "name" as const,
    type: "text" as const,
    required: true,
  },
  {
    label: "Label color" as const,
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

export const AddLabelForm = () => {
  const dispatch = useAppDispatch();
  const createLabelMutation = useCreateLabel();

  const onSubmit = (formValues: FormValues<typeof formFieldsConfig>) => {
    createLabelMutation.mutate(formValues);
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
