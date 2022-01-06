import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { SIDE_MENU } from "config/localStorage";
import React from "react";
import { EventWithProcessedField } from "types";
import * as localStorage from "utils/localStorage";

type MenuSectionProps = {
  /** A title of this section. */
  sectionTitle: string;
  /** Content of this section. */
  sectionContent: React.ReactNode;
  /** A component that will be placed on the right side of the section title. */
  rightSlot?: React.ReactNode;
  /** A class name that will be assigned to the outer-most component. */
  className?: string;
};

const MenuSection: React.FC<MenuSectionProps> = ({
  rightSlot,
  sectionTitle,
  sectionContent,
  className,
}) => {
  const theme = useTheme();
  const [collapsed, setCollapsed] = React.useState(() =>
    localStorage
      .getFromLocalStorage(SIDE_MENU.COLLAPSED_SECTIONS, [] as string[])
      .includes(sectionTitle),
  );

  const onToggle = (event: EventWithProcessedField<React.MouseEvent>) => {
    if (event.processed) return;
    setCollapsed((prevState) => {
      const newState = !prevState;

      const collapsedSections = localStorage.getFromLocalStorage(
        SIDE_MENU.COLLAPSED_SECTIONS,
        [] as string[],
      );
      const thisSectionIndex = collapsedSections.findIndex(
        (collapsedSection) => collapsedSection === sectionTitle,
      );

      if (thisSectionIndex === -1) {
        collapsedSections.push(sectionTitle);
      } else {
        collapsedSections.splice(thisSectionIndex, 1);
      }

      localStorage.saveToLocalStorage(
        SIDE_MENU.COLLAPSED_SECTIONS,
        collapsedSections,
      );

      return newState;
    });
  };

  return (
    <Accordion
      allowToggle
      width="100%"
      className={className}
      index={collapsed ? -1 : 0}
    >
      <AccordionItem border="none">
        <h3>
          <Flex alignItems="center">
            <AccordionButton
              _hover={{ background: "unset" }}
              _focus={{
                boxShadow: "unset",
              }}
              _focusVisible={{
                border: `2px solid ${theme.focus}`,
              }}
              fontSize="md"
              display="inline-block"
              onClick={onToggle}
              width="85%"
            >
              <Flex alignItems="center" color={theme.text}>
                <Box width="4rem">
                  <AccordionIcon />
                </Box>
                <Text
                  fontSize="md"
                  fontWeight="700"
                  lineHeight="1"
                  flexGrow="1"
                  textAlign="left"
                >
                  {sectionTitle}
                </Text>
              </Flex>
            </AccordionButton>
            <Box
              marginLeft="auto"
              visibility="hidden"
              width="15%"
              css={{
                "#sideMenu:hover &": {
                  visibility: "visible",
                },
              }}
            >
              {rightSlot}
            </Box>
          </Flex>
        </h3>
        <AccordionPanel>{sectionContent}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default MenuSection;
