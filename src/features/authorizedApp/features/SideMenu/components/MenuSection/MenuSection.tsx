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

type MenuSectionProps = {
  /** A title of this section. */
  sectionTitle: string;
  /** Content of this section. */
  sectionContent: React.ReactNode;
  /** A component that will be placed on the right side of the section title. */
  rightSlot?: React.ReactNode;
};

const MenuSection: React.FC<MenuSectionProps> = ({
  rightSlot,
  sectionTitle,
  sectionContent,
}) => {
  const theme = useTheme();

  return (
    <Accordion allowToggle width="100%">
      <AccordionItem border="none">
        {/* <h3 width="100%"> */}
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
        >
          <Flex
            alignItems="center"
            color={theme.text}
            width="100%"
            justifyContent="space-between"
          >
            <AccordionIcon alignSelf="flexStart" />
            <Text
              marginLeft="1rem"
              fontSize="md"
              fontWeight="700"
              lineHeight="1"
            >
              {sectionTitle}
            </Text>
            <Box marginLeft="1rem">{rightSlot}</Box>
          </Flex>
        </AccordionButton>
        {/* </h3> */}
        <AccordionPanel>{sectionContent}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default MenuSection;
