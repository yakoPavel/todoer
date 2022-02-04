import { FormFieldConfig, FormProps } from "../../Form";

import { LABEL_COLORS } from "@/config/labelColors";
import { UniqueChance } from "@/test/UniqueChance";

const SEED = 123456;
const chance = new UniqueChance(SEED);

type GenerateTestData = {
  numberOfFields?: number;
  numberOfRequiredFields?: number;
  override?: Partial<FormProps<FormFieldConfig[]>>;
};
/**
 * Generates `Form` props and test data.
 */
function generateTestData({
  numberOfFields = 6,
  numberOfRequiredFields = 2,
  override = {},
}: GenerateTestData = {}) {
  // Generating form fields config
  const fieldTypes = ["text", "switch", "color"];
  const formFieldsConfig = Array.from({ length: numberOfFields }, (_, i) => {
    return {
      label: chance.word(),
      type: fieldTypes[i % fieldTypes.length],
      name: chance.word(),
      required: i < numberOfRequiredFields ? true : undefined,
    };
  }) as FormFieldConfig[];

  // Generating data to fill in the form with
  const formData: Record<string, string | boolean> = {};
  formFieldsConfig.forEach((fieldConfig) => {
    if (fieldConfig.type === "text") {
      formData[fieldConfig.name] = chance.word();
    } else if (fieldConfig.type === "switch") {
      formData[fieldConfig.name] = chance.pickone([true, false]);
    } else {
      formData[fieldConfig.name] = LABEL_COLORS[0].value;
    }
  });

  return {
    props: {
      title: chance.word(),
      formFieldsConfig,
      onDismiss: jest.fn(),
      onSubmit: jest.fn(),
      submitButtonTitle: chance.word(),
      cancelButtonTitle: chance.word(),
      ...override,
    },
    formData,
  };
}

export { generateTestData };
