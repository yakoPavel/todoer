import styled from "@emotion/styled/macro";
import React from "react";

import { PreviewButton } from "../PreviewButton/PreviewButton";

import { Dialog } from "@/components/Dialog/Dialog";
import { useCurrentThemeSetter } from "@/context/ThemeContext";
import { actions as modalsActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";
import * as mediaQueries from "@/style/mediaQueries";
import { ThemeName } from "@/types";

const ContentContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  padding: 0.5rem;
  padding-bottom: 0;

  ${mediaQueries.md} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
type ContentProps = {
  onClick: (theme: ThemeName) => void;
};

const Content = ({ onClick }: ContentProps) => {
  return (
    <ContentContainer>
      <PreviewButton themeName="light" onClick={onClick} />
      <PreviewButton themeName="dark" onClick={onClick} />
      <PreviewButton themeName="noir" onClick={onClick} />
      <PreviewButton themeName="neutral" onClick={onClick} />
      <PreviewButton themeName="orange" onClick={onClick} />
    </ContentContainer>
  );
};

export const ThemeSwitcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const setAppTheme = useCurrentThemeSetter();

  const onThemeClick = (theme: ThemeName) => {
    setAppTheme(theme);
  };

  const dismissTheModal = () => {
    dispatch(modalsActions.themeSwitcherDialogDismissed());
  };

  return (
    <Dialog
      dialogContent={<Content onClick={onThemeClick} />}
      onCancel={dismissTheModal}
      onConfirm={dismissTheModal}
      dialogTitle="Theme"
    />
  );
};
