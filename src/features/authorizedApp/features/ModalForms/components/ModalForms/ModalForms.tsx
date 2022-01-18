import { useAppSelector } from "hooks/storeHooks";
import React from "react";
import { selectors } from "store/slices/ui";

import AddLabelForm from "../AddLabelForm/AddLabelForm";
import AddProjectForm from "../AddProjectForm/AddProjectForm";
import EditLabelForm from "../EditLabelForm/EditLabelForm";

const ModalForms = () => {
  const addProjectForm = useAppSelector(selectors.selectAddProjectFormState);
  const addLabelForm = useAppSelector(selectors.selectAddLabelFormState);
  const editProjectForm = useAppSelector(selectors.selectEditProjectFormState);
  const editLabelForm = useAppSelector(selectors.selectEditLabelFormState);

  if (addProjectForm.visible) {
    return <AddProjectForm />;
  }
  if (addLabelForm.visible) {
    return <AddLabelForm />;
  }
  if (editLabelForm.visible) {
    return <EditLabelForm />;
  }

  return null;
};

export default ModalForms;
