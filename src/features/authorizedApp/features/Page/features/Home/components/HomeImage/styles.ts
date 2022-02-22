import { keyframes } from "@emotion/react";
import styled from "@emotion/styled/macro";

/* Day image */

const sunAppearingAnimation = keyframes`
  from {
    transform: translate(-20%, 20%) rotate(-90deg);
  }
`;

const cloudsAnimation = keyframes`
  0%, 50%, 100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-1deg);
  }

  75% {
    transform: rotate(1deg);
  }
`;

const cloudAnimationDelay = Array.from(
  { length: 7 },
  (_, index) => `
    #Cloud${index} {
      animation-delay: ${index * 100}ms;
    }
  `,
);

export const DayImageContainer = styled.div`
  width: max(50%, 28rem);
  max-width: 98%;

  #Background {
    fill: ${({ theme }) => theme.main};
    fill-opacity: 0.3;
  }

  #Clouds {
    fill: ${({ theme }) => theme.main};
    fill-opacity: 0.5;
  }

  .Cloud {
    animation: ${cloudsAnimation} 1s linear;
    transform-origin: center;
  }

  ${cloudAnimationDelay}

  #Sun {
    fill: ${({ theme }) => theme.main};
    animation: ${sunAppearingAnimation} 1s linear;
    transform-origin: center;
  }
`;

/* Night image */

const moonAppearingAnimation = keyframes`
  from {
    transform: translateY(25%);
  }
`;

const starAnimation = keyframes`
  50% {
    transform: scale(1.01);
  }
`;

export const NightImageContainer = styled.div`
  width: max(50%, 28rem);
  max-width: 98%;

  #Background {
    fill: ${({ theme }) => theme.main};
    fill-opacity: 0.3;
  }

  #Stars {
    fill: ${({ theme }) => theme.main};
    fill-opacity: 0.5;
    animation: ${starAnimation} 1s linear;
    transform-origin: center;
  }

  #Moon {
    fill: ${({ theme }) => theme.main};
    animation: ${moonAppearingAnimation} 1s linear;
  }
`;
