import { PayloadActionCreator } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import React from "react";
import { UseMutationResult, UseQueryResult } from "react-query";

import { FormValues } from "../../types";
import { Form, FormFieldConfig } from "../Form/Form";

import { useAppDispatch } from "@/hooks/storeHooks";

/**
 * Returns config for the form fields with initial values
 */
function getFormFieldsConfigWithInitialValues<
  FieldsConfig extends FormFieldConfig[],
>(fieldsConfig: FieldsConfig, currentData: Record<string, unknown>) {
  return fieldsConfig.map((fieldConfig) => {
    if (fieldConfig.name in currentData) {
      return {
        ...fieldConfig,
        initialValue: currentData[fieldConfig.name as keyof typeof currentData],
      };
    }
    return fieldConfig;
  }) as FormFieldConfig[];
}

type EditItemFormProps<
  FieldsConfig extends FormFieldConfig[],
  Data extends { id: string },
> = {
  formTitle: string;
  itemId: string;
  fieldsConfig: FieldsConfig;
  itemsInfo: UseQueryResult<Data[]>;
  editItemMutation: UseMutationResult<Data, AxiosError, any>;
  closeModalAction: PayloadActionCreator;
};

export const EditItemForm = <
  FieldsConfig extends FormFieldConfig[],
  Data extends { id: string },
>({
  formTitle,
  itemId,
  fieldsConfig,
  editItemMutation,
  itemsInfo,
  closeModalAction,
}: EditItemFormProps<FieldsConfig, Data>) => {
  const dispatch = useAppDispatch();

  if (itemsInfo.isLoading) {
    // Show spinner here
    return null;
  }

  if (itemsInfo.isError) {
    // Show retry button
    return null;
  }

  console.log(itemsInfo.data);

  const currentData = itemsInfo.data?.find(
    (itemInfo) => itemInfo.id === itemId,
  );

  if (!currentData) {
    // Something is really wrong if we don't have data for this item
    throw new Error(`We don't have data for the item with the ${itemId} id!`);
  }

  const formFieldsConfig = getFormFieldsConfigWithInitialValues(
    fieldsConfig,
    currentData,
  ) as FieldsConfig;

  const onSubmit = (formValues: FormValues<FieldsConfig>) => {
    editItemMutation.mutate({ id: itemId, ...formValues });
    dispatch(closeModalAction());
  };

  const onDismiss = () => {
    dispatch(closeModalAction());
  };

  return (
    <Form
      title={formTitle}
      formFieldsConfig={formFieldsConfig}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  );
};
