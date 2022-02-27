import { VisuallyHidden } from "@chakra-ui/react";
import { useCombobox } from "downshift";
import React from "react";

import { SearchItem } from "../SearchItem/SearchItem";

import { useCorrectInputMaxWidth } from "./hooks/useCorrectFieldWidth";
import { useItemsData, ItemsData } from "./hooks/useItemsData";
import { useKeyboardFocus } from "./hooks/useKeyboardFocus";
import * as Styled from "./styles";

import { Tooltip } from "@/components/Tooltip/Tooltip";
import * as keyboardShortcuts from "@/config/keyboardShortcuts";

function getFilteredItems(inputValue: string, items: ItemsData): ItemsData {
  if (!inputValue) return items;

  return items.filter(({ name }) =>
    name.toLowerCase().includes(inputValue.toLowerCase()),
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
    onInputValueChange: ({ inputValue = "" }) => {
      setSearchQuery(inputValue);
      setInputItems(getFilteredItems(inputValue, itemsDataInfo.data));
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
  useKeyboardFocus(inputFieldRef);

  // It only updates the data when the new one appears as a result of outer
  // actions (the user adds/deletes data items etc.).
  React.useEffect(() => {
    setInputItems(getFilteredItems(searchQuery, itemsDataInfo.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsDataInfo.data]);

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
          <Styled.ClearIcon aria-hidden />
          <VisuallyHidden>Clear input</VisuallyHidden>
        </Styled.ClearButton>
        <Styled.SearchIcon />
        <Tooltip tooltipText="Search" shortcut={keyboardShortcuts.SEARCH}>
          <Styled.KeyboardShortcutHint>F</Styled.KeyboardShortcutHint>
        </Tooltip>
      </Styled.Combobox>
      <Styled.Menu {...getMenuProps()} aria-label="Search results">
        {isOpen &&
          inputItems.map((itemData, index) => {
            return (
              <SearchItem
                {...getItemProps({ item: itemData, index })}
                data={itemData}
                searchQuery={searchQuery}
                key={itemData.id}
              />
            );
          })}
      </Styled.Menu>
    </Styled.SearchContainer>
  );
};
