import React from "react";

import { PopupMenuProps, withPopupMenu } from "../../features/PopupMenu";
import MenuLink from "../MenuLink/MenuLink";
import * as Styled from "./styles";

/**
 * Data that is necessary for menu link rendering. Must contain the `name` field.
 * */
type RawData<Data> = Data extends { name: string } ? Data : never;

type AdditionalSlots<T> = {
  /**
   * A component factory for the right slot. It will be invoked with the
   * single item of the data and a popup trigger element.
   */
  rightSlot?: (
    data: T,
    PopupTriggerElement: React.ComponentType,
  ) => React.ReactNode;
  /**
   * A component factory for the left slot. It will be invoked with the
   * single item of the data and a popup trigger element.
   */
  leftSlot?: (
    data: T,
    PopupTriggerElement: React.ComponentType,
  ) => React.ReactNode;
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
  // The popup menu will be shown when the user initiates 'contextmenu' event
  // on the whole menu link.
  const MenuLinkWithPopup = withPopupMenu({
    Component: MenuLink,
    popupMenuConfig: popupConfig,
    showOn: "contextmenu",
  });

  // The popup menu will be shown when the user clicks/taps on the popup trigger.
  const PopupTrigger = withPopupMenu({
    Component: Styled.PopupTrigger,
    showOn: "click",
    popupMenuConfig: popupConfig,
  });

  return data.map((itemInfo) => ({
    component: (
      <MenuLinkWithPopup
        key={itemInfo.name}
        text={itemInfo.name}
        rightSlot={slots?.rightSlot?.(itemInfo, PopupTrigger)}
        leftSlot={slots?.leftSlot?.(itemInfo, PopupTrigger)}
      />
    ),
    id: itemInfo.name,
  }));
}
