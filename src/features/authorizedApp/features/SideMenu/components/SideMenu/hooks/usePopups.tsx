import React from "react";
import { BsThreeDots } from "react-icons/bs";

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
  const onPopupItemClick = (action: PopupAction) => {
    console.log(action);
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
