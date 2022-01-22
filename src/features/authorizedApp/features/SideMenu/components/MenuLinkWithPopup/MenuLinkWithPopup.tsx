import styled from "@emotion/styled/macro";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

import {
  PopupMenu,
  PopupMenuProps,
  usePopupMenu,
} from "../../features/PopupMenu";
import MenuLink, { MenuLinkProps, StyledLink } from "../MenuLink/MenuLink";

import { usePopupItemsClickHandler } from "./hooks/usePopupItemsClickHandler";

const PopupTriggerWrapper = styled.div`
  position: relative;
`;

const PopupTrigger = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  visibility: hidden;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 2rem;

  ${StyledLink}:hover & {
    visibility: visible;
  }

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const PopupTriggerContentWrapper = styled.div`
  ${StyledLink}:hover & {
    visibility: hidden;
  }
`;

const ClickPopupTrigger = React.forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode }
>(({ children }, ref) => {
  return (
    <PopupTriggerWrapper>
      <PopupTriggerContentWrapper>{children}</PopupTriggerContentWrapper>
      <PopupTrigger ref={ref}>
        <BsThreeDots />
      </PopupTrigger>
    </PopupTriggerWrapper>
  );
});
ClickPopupTrigger.displayName = "ClickPopupTrigger";

type MenuLinkWithPopupProps = MenuLinkProps & {
  /** A popup items config. */
  popupItemsConfig: PopupMenuProps["menuItems"];
  /** A type of the link. */
  type: "project" | "label";
};

const MenuLinkWithPopup = ({
  leftSlot,
  rightSlot,
  text,
  popupItemsConfig,
  type,
}: MenuLinkWithPopupProps) => {
  const {
    isPopupVisible: isContextMenuVisible,
    popupRef: contextMenuRef,
    triggerRef: contextMenuTriggerRef,
  } = usePopupMenu("contextmenu");
  const {
    isPopupVisible: isClickMenuVisible,
    popupRef: clickMenuRef,
    triggerRef: clickMenuTriggerRef,
  } = usePopupMenu("click");

  const popupItemsClickHandler = usePopupItemsClickHandler(type);

  return (
    <>
      <MenuLink
        text={text}
        leftSlot={leftSlot}
        rightSlot={
          <ClickPopupTrigger ref={clickMenuTriggerRef}>
            {rightSlot}
          </ClickPopupTrigger>
        }
        ref={contextMenuTriggerRef}
      />
      {(isContextMenuVisible || isClickMenuVisible) && (
        <PopupMenu
          menuItems={popupItemsConfig}
          onClick={popupItemsClickHandler}
          ref={(element) => {
            contextMenuRef(element);
            clickMenuRef(element);
          }}
        />
      )}
    </>
  );
};

export default MenuLinkWithPopup;
