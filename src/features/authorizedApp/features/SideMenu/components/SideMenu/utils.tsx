import React from "react";

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

/**
 * Generates 'draggables' for the `DragAndDrop` component
 */
export function getLinksAsDraggables<Data>(
  data: RawData<Data>[],
  slots?: AdditionalSlots<RawData<Data>>,
) {
  return data.map((itemInfo) => ({
    component: (
      <MenuLink
        key={itemInfo.name}
        text={itemInfo.name}
        rightSlot={slots?.rightSlot?.(itemInfo)}
        leftSlot={slots?.leftSlot?.(itemInfo)}
      />
    ),
    id: itemInfo.name,
  }));
}
