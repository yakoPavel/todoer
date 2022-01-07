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
  /** An id of the menu item. Must be unique from all other items in this menu. */
  id?: string;
};

export type PopupMenuProps = {
  /** A click handler that will be invoked when the menu items get clicked. */
  onClick: (clickedItemId: string) => void;
  /** Menu items setting. */
  menuItems: MenuItem[];
};

const PopupMenu = React.forwardRef<HTMLUListElement, PopupMenuProps>(
  ({ onClick, menuItems }, ref) => {
    const getMenuItems = () => {
      return menuItems.map(({ icon, text, id }) => (
        <ListItem
          role="menuitem"
          key={id ?? text}
          onClick={() => onClick(id ?? text)}
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

export default PopupMenu;
