import Tooltip from "components/UI/Tooltip";
import * as keyboardShortcuts from "constants/keyboardShortcuts";
import { useCombobox } from "downshift";
import faker from "faker"; // TODO: remove it later
import { debounce } from "lodash";
import React from "react";

import * as Styled from "./styles";

const items = [
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
  faker.lorem.words(),
];

function getFilteredItems(inputValue?: string) {
  if (!inputValue) return items;

  return items.filter((item) =>
    item
      .toLowerCase()
      .split(/\s+/)
      .some((word) => word.startsWith(inputValue.toLowerCase())),
  );
}

const Search = (): JSX.Element => {
  const inputFieldRef = React.useRef<HTMLInputElement>(null);
  const [inputItems, setInputItems] = React.useState(items);
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
      setInputItems(getFilteredItems(inputValue));
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

  const onClearClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setInputValue("");
  };

  const onInputBlur = () => setInputValue("");

  // Sets the input field max-width initially and whenever the window
  // width changes.
  React.useLayoutEffect(() => {
    if (!inputFieldRef.current) return;

    const { current: inputFiled } = inputFieldRef;

    const setInputFieldMaxWidth = debounce(() => {
      const { x: inputXCoord } = inputFiled.getBoundingClientRect();
      const windowWidth = document.documentElement.clientWidth;

      const MIN_PADDING_FROM_THE_BORDER = 16;

      const maxWidth = windowWidth - inputXCoord - MIN_PADDING_FROM_THE_BORDER;
      inputFiled.style.maxWidth = `${maxWidth}px`;
    }, 300);

    setInputFieldMaxWidth();
    window.addEventListener("resize", setInputFieldMaxWidth);

    return () => window.removeEventListener("resize", setInputFieldMaxWidth);
  }, [inputFieldRef]);

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
            <Styled.Item {...getItemProps({ item, index })} key={item}>
              {item}
            </Styled.Item>
          ))}
      </Styled.Menu>
    </Styled.SearchContainer>
  );
};

export default Search;
