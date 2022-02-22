import React from "react";

import { ReactComponent as DayImage } from "./assets/Day.svg";
import { ReactComponent as NightImage } from "./assets/Night.svg";
import * as Styled from "./styles";

type HomeImageProps = {
  /** Type of the image. */
  type: "day" | "night";
  /** A name of a CSS class that will be applied to the container.  */
  className?: string;
};

export const HomeImage = ({ type, className }: HomeImageProps) => {
  if (type === "day") {
    return (
      <Styled.DayImageContainer
        className={className}
        data-testid="homeImageDay"
      >
        <DayImage />
      </Styled.DayImageContainer>
    );
  }

  return (
    <Styled.NightImageContainer
      className={className}
      data-testid="homeImageNight"
    >
      <NightImage />
    </Styled.NightImageContainer>
  );
};
