import React from "react";

import { FormValues } from "../../types";
import { Form } from "../Form/Form";

import { useEditLabel } from "@/features/authorizedApp/api/editLabel";
import { useLabels } from "@/features/authorizedApp/api/getLabels";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

type FormFieldConfigWithInitialValues = [
  {
    label: "Label name";
    type: "text";
    name: "name";
    required: true;
    initialValue: string;
  },
  {
    label: "Label color";
    type: "color";
    name: "color";
    required: true;
    initialValue: string;
  },
  {
    label: "Add to favorites";
    type: "switch";
    name: "isFavorite";
    initialValue: boolean;
  },
];

/**
 * Returns config for the form fields with initial values
 */
function getFormFieldsConfigWithInitialValues(
  currentData: FormValues<FormFieldConfigWithInitialValues>,
): FormFieldConfigWithInitialValues {
  return [
    {
      label: "Label name",
      type: "text",
      name: "name",
      required: true,
      initialValue: currentData.name,
    },
    {
      label: "Label color",
      type: "color",
      name: "color",
      required: true,
      initialValue: currentData.color,
    },
    {
      label: "Add to favorites",
      type: "switch",
      name: "isFavorite",
      initialValue: currentData.isFavorite,
    },
  ];
}

type EditLabelFormProps = { labelId: string };

export const EditLabelForm = ({ labelId }: EditLabelFormProps) => {
  const dispatch = useAppDispatch();
  const editLabelMutation = useEditLabel();
  const labelsInfo = useLabels();

  if (labelsInfo.isLoading) {
    // Show spinner here
    return null;
  }

  if (labelsInfo.isError) {
    // Show retry button
    return null;
  }

  const currentData = labelsInfo.data?.find(
    (labelInfo) => labelInfo.id === labelId,
  );

  if (!currentData) {
    // Something is really wrong if we don't have data for this label
    throw new Error(`We don't have data for the label with the ${labelId} id!`);
  }

  const formFieldsConfig = getFormFieldsConfigWithInitialValues(currentData);

  const onSubmit = (
    formValues: FormValues<FormFieldConfigWithInitialValues>,
  ) => {
    editLabelMutation.mutate({ id: labelId, ...formValues });
    dispatch(modalsUiActions.editLabelFormDismissed());
  };

  const onDismiss = () => {
    dispatch(modalsUiActions.editLabelFormDismissed());
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
