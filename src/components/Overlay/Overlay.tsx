import styled from "@emotion/styled/macro";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;
