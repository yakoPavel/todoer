import { FormFieldConfig } from "../components/Form/Form";

type FilterItemsByName<
  Data extends { name: string },
  Name extends string,
> = Extract<Data, { name: Name }>;

export type FormState<Data extends FormFieldConfig[]> = {
  isValid: boolean;
  values: {
    [FieldName in Data[number]["name"]]: FilterItemsByName<
      Data[number],
      FieldName
    >["type"] extends "switch"
      ? boolean
      : string;
  };
};

export type FormValues<Data extends FormFieldConfig[]> =
  FormState<Data>["values"];

export type DivProps = Omit<React.ComponentPropsWithoutRef<"div">, "onSubmit">;
