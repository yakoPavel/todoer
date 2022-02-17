import styled from "@emotion/styled/macro";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const ContentContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 80rem;
  overflow-y: auto;
  transition: transform 0.3s;
`;
