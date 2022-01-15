import { LABEL_COLORS } from "config/labelColors";
import UniqueChance from "test/UniqueChance";

import { FormFieldConfig, ModalFormProps } from "../../Form/ModalForm";

const SEED = 123456;
const chance = new UniqueChance(SEED);

type GenerateTestData = {
  numberOfFields?: number;
  numberOfRequiredFields?: number;
  override?: Partial<ModalFormProps<FormFieldConfig[]>>;
};
/**
 * Generates `ModalForm` props and test data.
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
      required: i < numberOfRequiredFields ? true : undefined,
    };
  }) as FormFieldConfig[];

  // Generating data to fill in the form with
  const formData: Record<string, string | boolean> = {};
  formFieldsConfig.forEach((fieldConfig) => {
    if (fieldConfig.type === "text") {
      formData[fieldConfig.label] = chance.word();
    } else if (fieldConfig.type === "switch") {
      formData[fieldConfig.label] = chance.pickone([true, false]);
    } else {
      formData[fieldConfig.label] = LABEL_COLORS[0].value;
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
