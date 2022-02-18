import { useEditLabel } from "@/features/authorizedApp/api";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

export function useEditLabelHandlers(labelId: string) {
  const dispatch = useAppDispatch();
  const labelMutation = useEditLabel();

  const onEditLabel = () => {
    dispatch(modalsUiActions.editLabelFormAppeared({ triggerId: labelId }));
  };

  const onDeleteLabel = () => {
    dispatch(
      modalsUiActions.deleteItemDialogAppeared({
        itemId: labelId,
        itemType: "label",
      }),
    );
  };

  const onLabelTitleEdited = (newTitle: string) => {
    labelMutation.mutate({ name: newTitle, id: labelId });
  };

  return {
    onEditLabel,
    onDeleteLabel,
    onLabelTitleEdited,
  };
}
