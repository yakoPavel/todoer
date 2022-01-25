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
import React from "react";

import {
  actions as sideMenuActions,
  selectors,
} from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppSelector, useAppDispatch } from "@/hooks/storeHooks";
import { EventWithProcessedField } from "@/types";

type MenuSectionProps = {
  /** A title of this section. */
  sectionTitle: "Favorites" | "Projects" | "Labels";
  /** Content of this section. */
  sectionContent: React.ReactNode;
  /** A component that will be placed on the right side of the section title. */
  rightSlot?: React.ReactNode;
  /** A class name that will be assigned to the outer-most component. */
  className?: string;
};

export const MenuSection: React.FC<MenuSectionProps> = ({
  rightSlot,
  sectionTitle,
  sectionContent,
  className,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector((state) =>
    selectors.selectIsSectionOpened(sectionTitle, state),
  );

  const onToggle = (event: EventWithProcessedField<React.MouseEvent>) => {
    if (event.processed) return;

    if (isOpened) {
      dispatch(sideMenuActions.sectionClosed(sectionTitle));
    } else {
      dispatch(sideMenuActions.sectionOpened(sectionTitle));
    }
  };

  return (
    <Accordion
      allowToggle
      width="100%"
      className={className}
      index={isOpened ? 0 : -1}
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
