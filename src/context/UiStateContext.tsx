import React from "react";

import createContext from "./createContext";

type UiStateValues = {
  /** Whether or not the 'Add new project' form is visible. */
  addProjectVisible: boolean;
  /** Whether or not the 'Add new label' form is visible. */
  addLabelVisible: boolean;
  /** Whether or not the side menu is opened. */
  sideMenuOpened: boolean;
};

type UiStateSetters = {
  /** Set visibility of the 'Add new project' form. */
  setAddProjectVisible: React.Dispatch<React.SetStateAction<boolean>>;
  /** Set visibility of the 'Add new label' form. */
  setAddLabelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  /** Change the 'opened' state of the side menu. */
  setSideMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const [useUiStateValues, UiStateValuesProvider] =
  createContext<UiStateValues>();
const [useUiStateSetters, UiStateSettersProvider] =
  createContext<UiStateSetters>();

export const UiStateContextProvider: React.FC = ({ children }) => {
  const [addProjectVisible, setAddProjectVisible] = React.useState(false);
  const [addLabelVisible, setAddLabelVisible] = React.useState(false);
  const [sideMenuOpened, setSideMenuOpened] = React.useState(false);

  return (
    <UiStateSettersProvider
      value={{
        setAddProjectVisible,
        setAddLabelVisible,
        setSideMenuOpened,
      }}
    >
      <UiStateValuesProvider
        value={{
          addProjectVisible,
          addLabelVisible,
          sideMenuOpened,
        }}
      >
        {children}
      </UiStateValuesProvider>
    </UiStateSettersProvider>
  );
};

export { useUiStateSetters, useUiStateValues };
