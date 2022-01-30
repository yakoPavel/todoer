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

type MenuSectionImplProps = MenuSectionProps & {
  isOpened: boolean;
  onToggle: (e: EventWithProcessedField<React.MouseEvent>) => void;
};

const MenuSectionImpl = ({
  rightSlot,
  sectionTitle,
  sectionContent,
  onToggle,
  isOpened,
  className,
}: MenuSectionImplProps) => {
  const theme = useTheme();

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
              width="15%"
              opacity="0"
              css={{
                "#sideMenu:hover &": {
                  opacity: "1",
                },
              }}
            >
              {rightSlot}
            </Box>
          </Flex>
        </h3>
        <AccordionPanel>
          <Content content={sectionContent} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

type ContentProps = {
  content: React.ReactNode;
};
const Content = ({ content }: ContentProps) => {
  const theme = useTheme();

  if (content && !Array.isArray(content)) return <>{content}</>;
  if (content && Array.isArray(content) && content.length > 0)
    return <>{content}</>;

  return (
    <Flex justifyContent="center">
      <Text color={theme.text}>Nothing is there for now 😮</Text>
    </Flex>
  );
};

const MenuSectionWithReduxState: React.FC<MenuSectionProps> = ({
  rightSlot,
  sectionTitle,
  sectionContent,
  className,
}) => {
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
    <MenuSectionImpl
      rightSlot={rightSlot}
      sectionTitle={sectionTitle}
      sectionContent={sectionContent}
      className={className}
      isOpened={isOpened}
      onToggle={onToggle}
    />
  );
};

const MenuSectionWithLocalState: React.FC<MenuSectionProps> = ({
  rightSlot,
  sectionTitle,
  sectionContent,
  className,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);

  const onToggle = (event: EventWithProcessedField<React.MouseEvent>) => {
    if (event.processed) return;

    setIsOpened((prevState) => !prevState);
  };

  return (
    <MenuSectionImpl
      rightSlot={rightSlot}
      sectionTitle={sectionTitle}
      sectionContent={sectionContent}
      className={className}
      isOpened={isOpened}
      onToggle={onToggle}
    />
  );
};

export { MenuSectionWithReduxState as MenuSection, MenuSectionWithLocalState };
