import React from "react";

import LogoImg from "./logo.png";
import * as Styled from "./styles";

const UnauthorizedContainer: React.FC = ({ children }) => {
  return (
    <Styled.Wrapper>
      <Styled.CardWrapper>
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
