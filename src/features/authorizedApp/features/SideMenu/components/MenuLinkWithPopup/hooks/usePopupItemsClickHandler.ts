import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

type ActionType =
  | "ADD_PROJECT_ABOVE"
  | "ADD_PROJECT_BELOW"
  | "EDIT_PROJECT"
  | "ADD_TO_FAVORITES"
  | "DELETE_PROJECT"
  | "ADD_LABEL_ABOVE"
  | "ADD_LABEL_BELOW"
  | "EDIT_LABEL"
  | "DELETE_LABEL"
  | "REMOVE_FROM_FAVORITES";

function usePopupItemsClickHandler(triggerId: string) {
  const dispatch = useAppDispatch();

  const popupItemsClickHandler = (action: string) => {
    switch (action as ActionType) {
      case "ADD_LABEL_ABOVE": {
        dispatch(
          modalsUiActions.addLabelFormAppeared({
            additionDirection: "above",
            triggerId,
          }),
        );
        break;
      }
      case "ADD_LABEL_BELOW": {
        dispatch(
          modalsUiActions.addLabelFormAppeared({
            additionDirection: "below",
            triggerId,
          }),
        );
        break;
      }
      case "ADD_PROJECT_ABOVE": {
        dispatch(
          modalsUiActions.addProjectFormAppeared({
            additionDirection: "above",
            triggerId,
          }),
        );
        break;
      }
      case "ADD_PROJECT_BELOW": {
        dispatch(
          modalsUiActions.addProjectFormAppeared({
            additionDirection: "below",
            triggerId,
          }),
        );
        break;
      }
      case "EDIT_LABEL": {
        dispatch(modalsUiActions.editLabelFormAppeared({ triggerId }));
        break;
      }
      case "EDIT_PROJECT": {
        dispatch(modalsUiActions.editProjectFormAppeared({ triggerId }));
        break;
      }
      case "DELETE_LABEL": {
        dispatch(
          modalsUiActions.deleteItemDialogAppeared({
            itemType: "label",
            itemId: triggerId,
          }),
        );
        break;
      }
      case "DELETE_PROJECT": {
        dispatch(
          modalsUiActions.deleteItemDialogAppeared({
            itemType: "project",
            itemId: triggerId,
          }),
        );
        break;
      }
      default: {
        throw new Error(`Can't process the unknown action: ${action}`);
      }
    }
  };

  return popupItemsClickHandler;
}

export { usePopupItemsClickHandler };
