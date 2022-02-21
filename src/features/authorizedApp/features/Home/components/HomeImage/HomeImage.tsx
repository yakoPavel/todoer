import React from "react";

import { ReactComponent as DayImage } from "./assets/Day.svg";
import { ReactComponent as NightImage } from "./assets/Night.svg";
import * as Styled from "./styles";

type HomeImageProps = {
  /** Type of the image. */
  type: "day" | "night";
};

export const HomeImage = ({ type }: HomeImageProps) => {
  if (type === "day") {
    return (
      <Styled.DayImageContainer>
        <DayImage />
      </Styled.DayImageContainer>
    );
  }

  return (
    <Styled.NightImageContainer>
      <NightImage />
    </Styled.NightImageContainer>
  );
};
