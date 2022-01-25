import { PayloadActionCreator } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import React from "react";
import { UseMutationResult } from "react-query";

import { FormValues } from "../../types";
import { Form, FormFieldConfig } from "../Form/Form";

import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

type AddItemFormProps<FieldsConfig extends FormFieldConfig[], Data> = {
  fieldsConfig: FieldsConfig;
  createItemMutation: UseMutationResult<Data, AxiosError, any>;
  closeModalAction: PayloadActionCreator;
  openSectionAction: PayloadActionCreator;
};

export const AddItemForm = <FieldsConfig extends FormFieldConfig[], Data>({
  fieldsConfig,
  createItemMutation,
  closeModalAction,
  openSectionAction,
}: AddItemFormProps<FieldsConfig, Data>) => {
  const dispatch = useAppDispatch();

  const onSubmit = (formValues: FormValues<FieldsConfig>) => {
    createItemMutation.mutate(formValues);
    dispatch(closeModalAction());

    // Open the side menu section if it is closed. Defer it to the next tick
    // so that the new project is already in the list.
    setTimeout(() => dispatch(openSectionAction()), 0);
  };

  const onDismiss = () => {
    dispatch(modalsUiActions.addLabelFormDismissed());
  };

  return (
    <Form
      title="Add label"
      formFieldsConfig={fieldsConfig}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  );
};
