import Divider from "components/UI/Divider/Divider";
import { LoadingStateContextProvider } from "context/LoadingContext";
import React from "react";

import UnauthorizedContainer from "../UnauthorizedContainer/UnauthorizedContainer";

type UnauthorizedScreenProps = {
  /** A component that will be placed at the top. */
  topSlot?: React.ReactNode;
  /** Text of the divider after the top slot. If the value is null the divider doesn't show. */
  topSlotDividerText?: string | null;
  /** A component that will be placed in the middle. */
  middleSlot?: React.ReactNode;
  /** Text of the divider after the middle slot. If the value is null the divider doesn't show. */
  middleSlotDividerText?: string | null;
  /** A component that will be placed at the bottom. */
  bottomSlot?: React.ReactNode;
};

const UnauthorizedScreen: React.FC<UnauthorizedScreenProps> = ({
  topSlot,
  topSlotDividerText,
  middleSlot,
  middleSlotDividerText,
  bottomSlot,
}) => {
  return (
    <LoadingStateContextProvider>
      <UnauthorizedContainer>
        {topSlot && (
          <>
            {topSlot}
            {topSlotDividerText !== null && (
              <Divider inBetweenText={topSlotDividerText} />
            )}
          </>
        )}
        {middleSlot && (
          <>
            {middleSlot}
            {middleSlotDividerText !== null && (
              <Divider inBetweenText={middleSlotDividerText} margin="2rem" />
            )}
          </>
        )}
        {bottomSlot}
      </UnauthorizedContainer>
    </LoadingStateContextProvider>
  );
};

export default UnauthorizedScreen;
