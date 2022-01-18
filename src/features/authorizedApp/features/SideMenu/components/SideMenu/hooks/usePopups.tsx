import { useAppDispatch } from "hooks/storeHooks";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { actions as uiActions } from "store/slices/ui";

import { PopupMenuProps, withPopupMenu } from "../../../features/PopupMenu";
import { PopupAction } from "../../../types";
import MenuLink from "../../MenuLink/MenuLink";
import * as config from "../config";
import * as Styled from "../styles";

function getMenuLinkWithPopupComponent(
  menuItems: PopupMenuProps["menuItems"],
  onClick: PopupMenuProps["onClick"],
) {
  return withPopupMenu({
    Component: MenuLink,
    popupMenuConfig: {
      menuItems,
      onClick,
    },
    showOn: "contextmenu",
  });
}

function getClickPopupTriggerComponent(
  menuItems: PopupMenuProps["menuItems"],
  onClick: PopupMenuProps["onClick"],
) {
  return withPopupMenu({
    Component: ClickPopupTrigger,
    popupMenuConfig: {
      menuItems,
      onClick,
    },
    showOn: "click",
  });
}

const ClickPopupTrigger = React.forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode }
>(({ children }, ref) => {
  return (
    <Styled.PopupTriggerWrapper>
      {children}
      <Styled.PopupTrigger ref={ref}>
        <BsThreeDots />
      </Styled.PopupTrigger>
    </Styled.PopupTriggerWrapper>
  );
});
ClickPopupTrigger.displayName = "ClickPopupTrigger";

function usePopups() {
  const dispatch = useAppDispatch();

  const onPopupItemClick = (action: PopupAction, popupId: string) => {
    if (action === "ADD_LABEL_ABOVE") {
      dispatch(
        uiActions.addLabelFormAppeared({
          additionDirection: "above",
          triggerId: popupId,
        }),
      );
    } else if (action === "ADD_LABEL_BELOW") {
      dispatch(
        uiActions.addLabelFormAppeared({
          additionDirection: "below",
          triggerId: popupId,
        }),
      );
    } else if (action === "ADD_PROJECT_ABOVE") {
      dispatch(
        uiActions.addProjectFormAppeared({
          additionDirection: "above",
          triggerId: popupId,
        }),
      );
    } else if (action === "ADD_PROJECT_BELOW") {
      dispatch(
        uiActions.addProjectFormAppeared({
          additionDirection: "below",
          triggerId: popupId,
        }),
      );
    } else if (action === "EDIT_LABEL") {
      dispatch(uiActions.editLabelFormAppeared({ triggerId: popupId }));
    }
  };

  const ProjectsMenuLinkWithPopup = getMenuLinkWithPopupComponent(
    config.projectsPopupMenuItems,
    onPopupItemClick,
  );
  const ProjectsClickPopupTrigger = getClickPopupTriggerComponent(
    config.projectsPopupMenuItems,
    onPopupItemClick,
  );
  const LabelsMenuLinkWithPopup = getMenuLinkWithPopupComponent(
    config.labelsPopupMenuItems,
    onPopupItemClick,
  );
  const LabelsClickPopupTrigger = getClickPopupTriggerComponent(
    config.labelsPopupMenuItems,
    onPopupItemClick,
  );

  return {
    ProjectsMenuLinkWithPopup,
    ProjectsClickPopupTrigger,
    LabelsMenuLinkWithPopup,
    LabelsClickPopupTrigger,
  };
}

export { usePopups };
