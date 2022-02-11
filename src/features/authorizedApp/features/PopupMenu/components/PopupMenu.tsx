import styled from "@emotion/styled/macro";
import React from "react";
import ReactDOM from "react-dom";

const List = styled.ul`
  position: fixed;
  list-style: none;
  width: 25rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  padding: 0.3rem 0;
  user-select: none;
  border-radius: 3px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  z-index: 5000;
  overflow: hidden;
`;

const IconWrapper = styled.span`
  margin-right: 2rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.3em 1em;
  border: 1px solid transparent;
  border-left: none;
  border-right: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiary};
    border-color: ${({ theme }) => theme.separators};
  }
`;

/** An individual menu item. */
type MenuItem = {
  /** An element that represents an icon of the menu item. */
  icon: JSX.Element;
  /** Text of the menu item. */
  text: string;
  /** An id of the menu item. Will be passed as an argument to the click handler. */
  clickId: string;
};

type OnClickHandlerWithPopupId = (
  clickedItemId: string,
  popupId: string,
) => void;
type OnClickHandlerWithoutPopupId = (clickedItemId: string) => void;

type PopupMenuBaseProps = {
  /** Menu items setting. */
  menuItems: MenuItem[];
};

type PopupMenuPropsWithPopupId = {
  /** A click handler that will be invoked when the menu items get clicked. */
  onClick: OnClickHandlerWithPopupId;
  /** An id that helps to distinguish the element the popup menu is associated with. */
  popupId: string;
};

type PopupMenuPropsWithoutPopupId = {
  /** A click handler that will be invoked when the menu items get clicked. */
  onClick: OnClickHandlerWithoutPopupId;
  /** An id that helps to distinguish the element the popup menu is associated with. */
  popupId?: never;
};

export type PopupMenuProps =
  | (PopupMenuBaseProps & PopupMenuPropsWithPopupId)
  | (PopupMenuBaseProps & PopupMenuPropsWithoutPopupId);

export const PopupMenu = React.forwardRef<HTMLUListElement, PopupMenuProps>(
  ({ onClick, menuItems, popupId }, ref) => {
    const getMenuItems = () => {
      return menuItems.map(({ icon, text, clickId }) => (
        <ListItem
          role="menuitem"
          key={text}
          onClick={() =>
            popupId
              ? onClick(clickId, popupId)
              : (onClick as OnClickHandlerWithoutPopupId)(clickId)
          }
        >
          <IconWrapper>{icon}</IconWrapper>
          <span>{text}</span>
        </ListItem>
      ));
    };

    return ReactDOM.createPortal(
      <List role="menu" ref={ref}>
        {getMenuItems()}
      </List>,
      document.querySelector("#root") as Element,
    );
  },
);
PopupMenu.displayName = "PopupMenu";
