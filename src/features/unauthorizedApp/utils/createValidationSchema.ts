import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";

type ValidationSchemaFields = (
  | {
      /**
       * A type of the field. The `onlyRequired` type makes the
       * field required without any additional validations.
       */
      type: "email" | "password" | "onlyRequired";
      /** A name of the field in the schema */
      name: string;
    }
  | {
      /** A type of the field */
      type: "passwordConfirmation";
      /** A name of the field in the schema */
      name: string;
      /** The name of the field with a password to which this
       * password confirmation field should be bound */
      passwordName: string;
    }
)[];

/**
 * Generates a Yup validation schema based on the provided fields info.
 *
 * @param fields - An array with information about the fields.
 *
 * @return The generated Yup schema.
 */
export function createValidationSchema(fields: ValidationSchemaFields) {
  const schema: ObjectShape = {};

  fields.forEach((fieldInfo) => {
    const { type, name } = fieldInfo;

    switch (type) {
      case "onlyRequired": {
        schema[name] = Yup.string().required("Required");
        break;
      }
      case "email": {
        schema[name] = Yup.string()
          .email("The email is invalid")
          .required("Required");
        break;
      }
      case "password": {
        schema[name] = Yup.string()
          .min(8, "The password is too short - should be 8 chars minimum")
          .matches(
            /[A-Z]/,
            "The password should contain at least one capital letter",
          )
          .matches(/[0-9]/, "The password should contain at least on digit")
          .required("Required");
        break;
      }
      case "passwordConfirmation": {
        schema[name] = Yup.string()
          .oneOf(
            [Yup.ref(fieldInfo.passwordName)],
            "The passwords do not match",
          )
          .required("Required");
        break;
      }
      default: {
        throw new Error(`${type} is not the correct type of the field.`);
      }
    }
  });

  return Yup.object(schema);
}
