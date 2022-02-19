import { Slide, VisuallyHidden } from "@chakra-ui/react";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

import { useResize } from "./hooks/useResize";
import { useSideMenuItems } from "./hooks/useSideMenuItems";
import * as Styled from "./styles";

import { SIDE_MENU } from "@/config/localStorage";
import { useLabels, useProjects } from "@/features/authorizedApp/api";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { Label, Project } from "@/features/authorizedApp/types";
import { useAppDispatch } from "@/hooks/storeHooks";
import { EventWithProcessedField } from "@/types";
import { getFromLocalStorage } from "@/utils/localStorage";

type AddNewButtonProps = React.ComponentPropsWithRef<"button"> & {
  label: string;
};
const AddNewButton = ({ label, ...otherProps }: AddNewButtonProps) => {
  return (
    <Styled.StyledButton {...otherProps}>
      <IoAddOutline size="2rem" aria-hidden />
      <VisuallyHidden>{label}</VisuallyHidden>
    </Styled.StyledButton>
  );
};

type SideMenuContentProps = {
  labelsData: Label[];
  projectsData: Project[];
};
const SideMenuContent = ({
  labelsData,
  projectsData,
}: SideMenuContentProps) => {
  const { projectItems, labelItems, favoriteItems } = useSideMenuItems(
    projectsData,
    labelsData,
  );

  const dispatch = useAppDispatch();

  const onAddNew = (
    type: "project" | "label",
    event: EventWithProcessedField<React.MouseEvent>,
  ) => {
    // eslint-disable-next-line no-param-reassign
    event.processed = true;

    if (type === "project") {
      dispatch(modalsUiActions.addProjectFormAppeared());
    } else if (type === "label") {
      dispatch(modalsUiActions.addLabelFormAppeared());
    }
  };

  return (
    <Styled.MenuWrapper id="sideMenu" data-testid="sideMenuContent">
      <Styled.StyledMenuSection
        sectionTitle="Favorites"
        sectionContent={favoriteItems}
      />
      <Styled.StyledMenuSection
        sectionTitle="Projects"
        sectionContent={projectItems}
        rightSlot={
          <AddNewButton
            label="Add new project"
            onClick={(event) => onAddNew("project", event)}
          />
        }
      />
      <Styled.StyledMenuSection
        sectionTitle="Labels"
        sectionContent={labelItems}
        rightSlot={
          <AddNewButton
            label="Add new label"
            onClick={(event) => onAddNew("label", event)}
          />
        }
      />
    </Styled.MenuWrapper>
  );
};

type SideMenuProps = {
  /** Whether or not the side menu is opened. */
  isOpen: boolean;
};
export const SideMenu = ({ isOpen }: SideMenuProps) => {
  const projectsInfo = useProjects();
  const labelsInfo = useLabels();

  const {
    ResizeHandle,
    innerResizableElemRef,
    outerResizableElemRef,
    resizeHandleProps,
  } = useResize({
    maxWidth: 350,
    minWidth: 250,
  });

  const initialWidth = React.useMemo(
    () => getFromLocalStorage(SIDE_MENU.WIDTH, 305),
    [],
  );

  return (
    <Slide
      direction="left"
      in={isOpen}
      style={{
        width: `${initialWidth}px`,
        top: "var(--header-height, 0)",
        maxWidth: "100%",
        zIndex: 5,
      }}
      ref={outerResizableElemRef}
    >
      <Styled.MenuWrapper>
        <Styled.MenuContentWrapperOuter>
          <Styled.MenuContentWrapperInner ref={innerResizableElemRef}>
            {projectsInfo.isSuccess && labelsInfo.isSuccess && (
              <SideMenuContent
                projectsData={projectsInfo.data}
                labelsData={labelsInfo.data}
              />
            )}
          </Styled.MenuContentWrapperInner>
        </Styled.MenuContentWrapperOuter>
        <ResizeHandle {...resizeHandleProps} />
      </Styled.MenuWrapper>
    </Slide>
  );
};
