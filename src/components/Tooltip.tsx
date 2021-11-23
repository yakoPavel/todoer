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

type TooltipProps = React.ComponentProps<typeof ChakraTooltip> & {
  content?: { text: string; shortcut?: string[] };
};

const Tooltip = ({ content, ...otherProps }: TooltipProps) => {
  function formLabel() {
    if (content === undefined) return content;

    if (!content.shortcut) return <Text>{content.text}</Text>;

    const shortcut = content.shortcut.map((kbKey, index) => (
      <React.Fragment key={kbKey}>
        {index > 0 && "+"}
        <StyledKbd>{kbKey}</StyledKbd>
      </React.Fragment>
    ));

    return (
      <Text display="flex" alignItems="center">
        {content.text}&nbsp;{shortcut}
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
