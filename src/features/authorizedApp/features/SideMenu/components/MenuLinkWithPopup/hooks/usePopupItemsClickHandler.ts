import { useAppDispatch } from "@/hooks/storeHooks";
import { actions as uiActions } from "@/store/slices/ui";

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

function usePopupItemsClickHandler(popupType: string) {
  const dispatch = useAppDispatch();

  const popupItemsClickHandler = (action: string) => {
    switch (action as ActionType) {
      case "ADD_LABEL_ABOVE": {
        dispatch(
          uiActions.addLabelFormAppeared({
            additionDirection: "above",
            triggerId: popupType,
          }),
        );
        break;
      }
      case "ADD_LABEL_BELOW": {
        dispatch(
          uiActions.addLabelFormAppeared({
            additionDirection: "below",
            triggerId: popupType,
          }),
        );
        break;
      }
      case "ADD_PROJECT_ABOVE": {
        dispatch(
          uiActions.addProjectFormAppeared({
            additionDirection: "above",
            triggerId: popupType,
          }),
        );
        break;
      }
      case "ADD_PROJECT_BELOW": {
        dispatch(
          uiActions.addProjectFormAppeared({
            additionDirection: "below",
            triggerId: popupType,
          }),
        );
        break;
      }
      case "EDIT_LABEL": {
        dispatch(uiActions.editLabelFormAppeared({ triggerId: popupType }));
        break;
      }
      case "EDIT_PROJECT": {
        dispatch(uiActions.editProjectFormAppeared({ triggerId: popupType }));
        break;
      }
      case "DELETE_LABEL": {
        dispatch(
          uiActions.deleteItemDialogAppeared({
            itemType: "label",
            itemId: popupType,
          }),
        );
        break;
      }
      case "DELETE_PROJECT": {
        dispatch(
          uiActions.deleteItemDialogAppeared({
            itemType: "project",
            itemId: popupType,
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
