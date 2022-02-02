import styled from "@emotion/styled/macro";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

import { ReactComponent as ThemePreview } from "../../assets/themePreview.svg";

import { useCurrentThemeName } from "@/context/ThemeContext";
import * as themes from "@/style/colors";
import * as mediaQueries from "@/style/mediaQueries";
import { ThemeName, ThemeColors } from "@/types";

const Container = styled.button`
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.separators};
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const PreviewImg = styled(ThemePreview)<{ colors: ThemeColors }>`
  width: 12.5rem;
  height: auto;
  display: block;

  ${mediaQueries.sm} {
    width: 15rem;
  }

  ${mediaQueries.preMd} {
    width: 20rem;
  }

  .header {
    fill: ${({ colors }) => colors.header};
  }
  .text {
    fill: ${({ colors }) => colors.text};
  }
  .sideMenu {
    fill: ${({ colors }) => colors.backgroundSecondary};
  }
  .button {
    fill: ${({ colors }) => colors.main};
  }
  .background {
    fill: ${({ colors }) => colors.background};
  }
`;

const CurrentThemeCheckmark = styled(AiOutlineCheck)`
  position: absolute;
  left: 2%;
  bottom: 2%;
  color: ${({ theme }) => theme.main};
`;

type PreviewProps = {
  /** A name of the theme. */
  themeName: ThemeName;
  /** A callback that will be invoked with the theme name when the button is clicked. */
  onClick: (themeName: ThemeName) => void;
};

export const PreviewButton: React.FC<PreviewProps> = ({
  themeName,
  onClick,
}) => {
  const isCurrentTheme = useCurrentThemeName() === themeName;
  const colors = themes[`${themeName}Theme`];

  return (
    <Container
      role="radio"
      aria-checked={isCurrentTheme}
      aria-label={themeName}
      onClick={() => onClick(themeName)}
    >
      <PreviewImg colors={colors} />
      {isCurrentTheme && (
        <CurrentThemeCheckmark size="20%" data-testid="checkmark" />
      )}
    </Container>
  );
};
