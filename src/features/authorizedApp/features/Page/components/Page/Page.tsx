import React from "react";

import * as Styled from "./styles";

export const Page: React.FC = ({ children }) => {
  return (
    <Styled.Container>
      <Styled.ContentContainer>{children}</Styled.ContentContainer>
    </Styled.Container>
  );
};
