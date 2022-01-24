/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import React from "react";

import { Form } from "../Form/Form";

import { useEditLabel } from "@/features/authorizedApp/api/editLabel";
import { useAppDispatch } from "@/hooks/storeHooks";
import { actions as uiActions } from "@/store/slices/ui";

type FormFieldsConfig = React.ComponentPropsWithoutRef<
  typeof Form
>["formFieldsConfig"];

const formFieldsConfig: FormFieldsConfig = [
  {
    label: "Label name" as const,
    type: "text" as const,
    name: "name" as const,
    required: true,
  },
  {
    label: "Label color" as const,
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

type EditLabelFormProps = { labelId: string };

export const EditLabelForm = ({ labelId }: EditLabelFormProps) => {
  const dispatch = useAppDispatch();
  const editLabelMutation = useEditLabel();

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
    editLabelMutation.mutate({ id: labelId, ...formValues });
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
