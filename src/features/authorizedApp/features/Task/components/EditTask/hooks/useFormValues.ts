import React from "react";

export function useFormValues(
  initialTitle: string,
  initialDescription: string,
) {
  const [titleValue, setTitleValue] = React.useState(initialTitle);
  const [descriptionValue, setDescriptionValue] =
    React.useState(initialDescription);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitleValue(event.target.value);

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescriptionValue(event.target.value);

  const isFormValid = !!titleValue.trim();

  return {
    titleValue,
    onTitleChange,
    onDescriptionChange,
    descriptionValue,
    isFormValid,
  };
}
