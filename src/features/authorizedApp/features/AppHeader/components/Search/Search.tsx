import { useCombobox } from "downshift";
import React from "react";

import { useCorrectInputMaxWidth } from "./hooks/useCorrectFieldWidth";
import { useItemsData, ItemsData } from "./hooks/useItemsData";
import * as Styled from "./styles";

import { Tooltip } from "@/components/Tooltip/Tooltip";
import * as keyboardShortcuts from "@/config/keyboardShortcuts";

function getFilteredItems(inputValue: string, items: ItemsData): ItemsData {
  if (!inputValue) return items;

  return items.filter(({ name }) =>
    name
      .toLowerCase()
      .split(/\s+/)
      .some((word) => word.startsWith(inputValue.toLowerCase())),
  );
}

export const Search = (): JSX.Element => {
  const inputFieldRef = React.useRef<HTMLInputElement>(null);
  const itemsDataInfo = useItemsData();
  const [inputItems, setInputItems] = React.useState<ItemsData>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    setInputValue,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setSearchQuery(inputValue ?? "");
    },
    stateReducer: (_, actionAndChanges) => {
      const { changes } = actionAndChanges;
      if (changes.inputValue) return changes;

      return {
        ...changes,
        isOpen: false,
      };
    },
  });

  useCorrectInputMaxWidth(inputFieldRef);

  React.useEffect(() => {
    setInputItems(getFilteredItems(searchQuery, itemsDataInfo.data));
  }, [itemsDataInfo.data, searchQuery]);

  const onClearClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setInputValue("");
  };

  const onInputBlur = () => setInputValue("");

  return (
    <Styled.SearchContainer>
      <Styled.Combobox {...getComboboxProps()}>
        <Styled.Input
          {...getInputProps({ ref: inputFieldRef })}
          placeholder="Search"
          onBlur={onInputBlur}
          role="search"
        />
        <Styled.ClearButton onMouseDown={onClearClick}>
          <Styled.ClearIcon />
        </Styled.ClearButton>
        <Styled.SearchIcon />
        <Tooltip tooltipText="Search" shortcut={keyboardShortcuts.SEARCH}>
          <Styled.KeyboardShortcutHint>F</Styled.KeyboardShortcutHint>
        </Tooltip>
      </Styled.Combobox>
      <Styled.Menu {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <Styled.Item {...getItemProps({ item, index })} key={item.id}>
              {item.name}
            </Styled.Item>
          ))}
      </Styled.Menu>
    </Styled.SearchContainer>
  );
};
