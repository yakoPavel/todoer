import { PayloadActionCreator } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import React from "react";
import { UseMutationResult } from "react-query";

import { FormValues, DivProps } from "../../types";
import { Form, FormFieldConfig } from "../Form/Form";

import { useAppDispatch } from "@/hooks/storeHooks";

type BaseAddItemFormProps<FieldsConfig extends FormFieldConfig[], Data> = {
  formTitle: string;
  fieldsConfig: FieldsConfig;
  createItemMutation: UseMutationResult<Data, AxiosError, any>;
  closeModalAction: PayloadActionCreator;
  openSectionAction: PayloadActionCreator;
};

type AddItemFormPropsWithDirection = {
  direction: "above" | "below";
  triggerId: string;
};

type AddItemFromPropsWithoutDirection = {
  direction?: undefined;
  triggerId?: undefined;
};

type AddItemFormProps<FieldsConfig extends FormFieldConfig[], Data> =
  | (BaseAddItemFormProps<FieldsConfig, Data> & AddItemFormPropsWithDirection)
  | (BaseAddItemFormProps<FieldsConfig, Data> &
      AddItemFromPropsWithoutDirection);

export const AddItemForm = <FieldsConfig extends FormFieldConfig[], Data>({
  formTitle,
  fieldsConfig,
  createItemMutation,
  closeModalAction,
  openSectionAction,
  direction,
  triggerId,
  ...otherProps
}: DivProps & AddItemFormProps<FieldsConfig, Data>) => {
  const dispatch = useAppDispatch();

  const onSubmit = (formValues: FormValues<FieldsConfig>) => {
    createItemMutation.mutate({ ...formValues, direction, triggerId });
    dispatch(closeModalAction());

    // Open the side menu section if it is closed. Defer it to the next tick
    // so that the new project is already in the list.
    setTimeout(() => dispatch(openSectionAction()), 0);
  };

  const onDismiss = () => {
    dispatch(closeModalAction());
  };

  return (
    <Form
      title={formTitle}
      formFieldsConfig={fieldsConfig}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
      {...otherProps}
    />
  );
};
