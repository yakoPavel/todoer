/** @jsxImportSource @emotion/react */
import { Kbd, Text, Tooltip as ChakraTooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

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
  tooltipText: string;
  shortcut?: string[];
};

const Tooltip = ({ tooltipText, shortcut, ...otherProps }: TooltipProps) => {
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

export default Tooltip;
