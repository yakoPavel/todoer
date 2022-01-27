import { actionIds } from "../../../config/popupMenuActionIds";

import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

type ActionId = typeof actionIds[keyof typeof actionIds];

function usePopupItemsClickHandler(triggerId: string) {
  const dispatch = useAppDispatch();

  const popupItemsClickHandler = (actionId: string) => {
    switch (actionId as ActionId) {
      case actionIds.ADD_LABEL_ABOVE: {
        dispatch(
          modalsUiActions.addLabelFormAppeared({
            additionDirection: "above",
            triggerId,
          }),
        );
        break;
      }
      case actionIds.ADD_LABEL_BELOW: {
        dispatch(
          modalsUiActions.addLabelFormAppeared({
            additionDirection: "below",
            triggerId,
          }),
        );
        break;
      }
      case actionIds.ADD_PROJECT_ABOVE: {
        dispatch(
          modalsUiActions.addProjectFormAppeared({
            additionDirection: "above",
            triggerId,
          }),
        );
        break;
      }
      case actionIds.ADD_PROJECT_BELOW: {
        dispatch(
          modalsUiActions.addProjectFormAppeared({
            additionDirection: "below",
            triggerId,
          }),
        );
        break;
      }
      case actionIds.EDIT_LABEL: {
        dispatch(modalsUiActions.editLabelFormAppeared({ triggerId }));
        break;
      }
      case actionIds.EDIT_PROJECT: {
        dispatch(modalsUiActions.editProjectFormAppeared({ triggerId }));
        break;
      }
      case actionIds.DELETE_LABEL: {
        dispatch(
          modalsUiActions.deleteItemDialogAppeared({
            itemType: "label",
            itemId: triggerId,
          }),
        );
        break;
      }
      case actionIds.DELETE_PROJECT: {
        dispatch(
          modalsUiActions.deleteItemDialogAppeared({
            itemType: "project",
            itemId: triggerId,
          }),
        );
        break;
      }
      default: {
        throw new Error(`Can't process the unknown actionId: ${actionId}`);
      }
    }
  };

  return popupItemsClickHandler;
}

export { usePopupItemsClickHandler };
