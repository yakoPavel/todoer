import React from "react";

import * as Styled from "./styled";
import { getTimeOfDay } from "./utils/getTimeOfDay";

import { Page } from "@/features/authorizedApp/features/Page";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const onAddProjectClick = () => {
    dispatch(modalsUiActions.addProjectFormAppeared());
  };

  const onAddLabelClick = () => {
    dispatch(modalsUiActions.addLabelFormAppeared());
  };

  return (
    <Page>
      <Styled.HomeImage type={getTimeOfDay(new Date())} />
      <Styled.Greeting>
        Good {getTimeOfDay(new Date(), true)}! What&apos;s on your mind?
      </Styled.Greeting>
      <Styled.SecondaryGreeting>
        Maybe it&apos;s time to add something new?
      </Styled.SecondaryGreeting>
      <Styled.ButtonsContainer>
        <Styled.Button onClick={onAddProjectClick}>Add Project</Styled.Button>
        <Styled.Button onClick={onAddLabelClick}>Add Label</Styled.Button>
      </Styled.ButtonsContainer>
    </Page>
  );
};
