import { debounce } from "lodash";
import React from "react";

import LogoImg from "./logo.png";
import * as Styled from "./styles";

/**
 * Makes the handed element align itself by the top of the screen if the element
 * height is more than the window height.
 */
function placeAtTheTopIfOverflows(element: HTMLElement) {
  if (element.offsetHeight < document.documentElement.clientHeight) {
    element.classList.remove("alignToTop");
  } else {
    element.classList.add("alignToTop");
  }
}

const UnauthorizedContainer: React.FC = ({ children }) => {
  const cardWrapperRef = React.useRef<HTMLDivElement>(null);

  /* Corrects the position of the cart. */
  React.useLayoutEffect(() => {
    if (cardWrapperRef.current === null) return;

    const cardWrapper = cardWrapperRef.current;
    const fixTheElementPosition = debounce(
      () => placeAtTheTopIfOverflows(cardWrapper),
      50,
    );
    fixTheElementPosition();
    fixTheElementPosition.flush();

    window.addEventListener("resize", fixTheElementPosition);

    return () => {
      window.removeEventListener("resize", fixTheElementPosition);
      fixTheElementPosition.cancel();
    };
  }, [cardWrapperRef]);

  return (
    <Styled.Wrapper>
      <Styled.CardWrapper ref={cardWrapperRef}>
        <Styled.BrandSection>
          <Styled.Logo src={LogoImg} alt="logo" />
          <Styled.Slogan>Makes your life organized</Styled.Slogan>
        </Styled.BrandSection>

        <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
      </Styled.CardWrapper>
    </Styled.Wrapper>
  );
};

export default UnauthorizedContainer;
