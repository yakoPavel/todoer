import React from "react";

import { PopupMenuProps, withPopupMenu } from "../../features/PopupMenu";
import MenuLink from "../MenuLink/MenuLink";

/**
 * Data that is necessary for menu link rendering. Must contain the `name` field.
 * */
type RawData<Data> = Data extends { name: string } ? Data : never;

type AdditionalSlots<T> = {
  /**
   * A component factory for the right slot. It will be invoked with the
   * single item of the data.
   */
  rightSlot?: (data: T) => React.ReactNode;
  /**
   * A component factory for the left slot. It will be invoked with the
   * single item of the data.
   */
  leftSlot?: (data: T) => React.ReactNode;
};

type GetLinksAsDraggablesOptions<Data> = {
  data: RawData<Data>[];
  popupConfig: PopupMenuProps;
  slots?: AdditionalSlots<RawData<Data>>;
};

/**
 * Generates 'draggables' for the `DragAndDrop` component
 */
export function getLinksAsDraggables<Data>({
  data,
  slots,
  popupConfig,
}: GetLinksAsDraggablesOptions<Data>) {
  const MenuLinkWithPopup = withPopupMenu({
    Component: MenuLink,
    popupMenuConfig: popupConfig,
    showOn: "contextmenu",
  });

  return data.map((itemInfo) => ({
    component: (
      <MenuLinkWithPopup
        key={itemInfo.name}
        text={itemInfo.name}
        rightSlot={slots?.rightSlot?.(itemInfo)}
        leftSlot={slots?.leftSlot?.(itemInfo)}
      />
    ),
    id: itemInfo.name,
  }));
}
