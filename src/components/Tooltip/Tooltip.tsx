/** @jsxImportSource @emotion/react */
import { Kbd, Text, Tooltip as ChakraTooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

import { useMedia } from "@/hooks/useMedia";

const StyledKbd = styled(Kbd)`
  background-color: ${({ theme }) => theme.tooltipBackground};
`;
const StyledChakraTooltip = styled(ChakraTooltip)`
  background: ${({ theme }) => theme.tooltipBackground};
  color: ${({ theme }) => theme.textAlt};
  border-radius: 3px;
  padding: 0.4em 0.5em;
  font-weight: 400;
`;

export type TooltipProps = React.ComponentProps<typeof ChakraTooltip> & {
  /** A react component to use as the trigger for the tooltip. */
  children: React.ReactNode;
  /** A tooltip text. */
  tooltipText: string;
  /** A keyboard shortcut. Each entry in the array represents a keyboard key name. */
  shortcut?: string[];
};

/**
 * It is a component that represents a tooltip with text content and optionally
 * a keyboard shortcut.
 *
 * When the user's device can't hover, this component returns its children
 * without the tooltip functionality.
 */
export const Tooltip = ({
  tooltipText,
  shortcut,
  ...otherProps
}: TooltipProps) => {
  const cantHover = useMedia("(hover: none)");

  if (cantHover) return <>{otherProps.children}</>;

  function formLabel() {
    if (!shortcut) return <Text>{tooltipText}</Text>;

    const formedShortcut = shortcut.map((kbKey, index) => (
      <React.Fragment key={kbKey}>
        {index > 0 && "+"}
        <StyledKbd>{kbKey}</StyledKbd>
      </React.Fragment>
    ));

    return (
      <Text display="flex" alignItems="center">
        {tooltipText}&nbsp;{formedShortcut}
      </Text>
    );
  }

  return (
    <StyledChakraTooltip
      openDelay={300}
      closeOnClick={false}
      label={formLabel()}
      {...otherProps}
    />
  );
};
