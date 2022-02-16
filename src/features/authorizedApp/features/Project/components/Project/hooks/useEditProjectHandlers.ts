import { useEditProject } from "@/features/authorizedApp/api";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

export function useEditProjectHandlers(projectId: string) {
  const dispatch = useAppDispatch();
  const projectMutation = useEditProject();

  const onEditProject = () => {
    dispatch(modalsUiActions.editProjectFormAppeared({ triggerId: projectId }));
  };

  const onDeleteProject = () => {
    dispatch(
      modalsUiActions.deleteItemDialogAppeared({
        itemId: projectId,
        itemType: "project",
      }),
    );
  };

  const onProjectTitleEdited = (newTitle: string) => {
    projectMutation.mutate({ name: newTitle, id: projectId });
  };

  return {
    onEditProject,
    onDeleteProject,
    onProjectTitleEdited,
  };
}
