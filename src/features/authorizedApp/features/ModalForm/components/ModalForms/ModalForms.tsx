import { useUiStateValues } from "context/UiStateContext";
import React from "react";

import AddLabelForm from "../AddLabelForm/AddLabelForm";
import AddProjectForm from "../AddProjectForm/AddProjectForm";

const ModalForms = () => {
  const { addLabelVisible, addProjectVisible } = useUiStateValues();

  if (addProjectVisible) {
    return <AddProjectForm />;
  }
  if (addLabelVisible) {
    return <AddLabelForm />;
  }

  return null;
};

export default ModalForms;
