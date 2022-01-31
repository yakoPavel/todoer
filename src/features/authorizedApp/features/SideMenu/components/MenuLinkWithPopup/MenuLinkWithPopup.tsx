import styled from "@emotion/styled/macro";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { LinkProps } from "react-router-dom";

import {
  PopupMenu,
  PopupMenuProps,
  usePopupMenu,
} from "../../features/PopupMenu";
import { MenuLinkProps, StyledLink, MenuLink } from "../MenuLink/MenuLink";

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
  /**
   * An id of the link. Will be passed as a payload when the user clicks
   * on a popup menu item.
   */
  id: string;
} & LinkProps;

export const MenuLinkWithPopup = ({
  leftSlot,
  rightSlot,
  text,
  popupItemsConfig,
  id,
  ...otherProps
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

  const popupItemsClickHandler = usePopupItemsClickHandler(id);

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
        {...otherProps}
      />
      {(isContextMenuVisible || isClickMenuVisible) && (
        <>
          <PopupMenu
            menuItems={popupItemsConfig}
            onClick={popupItemsClickHandler}
            ref={(element) => {
              contextMenuRef(element);
              clickMenuRef(element);
            }}
          />
        </>
      )}
    </>
  );
};
