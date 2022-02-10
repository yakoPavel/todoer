import { PayloadActionCreator } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import React from "react";
import { UseMutationResult, UseQueryResult } from "react-query";

import { FormValues, DivProps } from "../../types";
import { Form, FormFieldConfig } from "../Form/Form";

import { ErrorScreen } from "@/features/authorizedApp/components/ErrorScreen/ErrorScreen";
import { Spinner } from "@/features/authorizedApp/components/Spinner/Spinner";
import { Project, Label } from "@/features/authorizedApp/types";
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
  Data extends Project | Label,
> = {
  formTitle: string;
  itemId: string;
  fieldsConfig: FieldsConfig;
  itemInfo: UseQueryResult<Data>;
  editItemMutation: UseMutationResult<Data, AxiosError, any>;
  closeModalAction: PayloadActionCreator;
};

export const EditItemForm = <
  FieldsConfig extends FormFieldConfig[],
  Data extends Project | Label,
>({
  formTitle,
  itemId,
  fieldsConfig,
  editItemMutation,
  itemInfo,
  closeModalAction,
  ...otherProps
}: DivProps & EditItemFormProps<FieldsConfig, Data>) => {
  const dispatch = useAppDispatch();

  if (itemInfo.isError) {
    return <ErrorScreen />;
  }

  if (!itemInfo.data) {
    return <Spinner size="xl" />;
  }

  const formFieldsConfig = getFormFieldsConfigWithInitialValues(
    fieldsConfig,
    itemInfo.data,
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
      {...otherProps}
    />
  );
};
