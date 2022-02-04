import isPropValid from "@emotion/is-prop-valid";
import { css, keyframes, Theme } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import React from "react";
import { IoCheckmark } from "react-icons/io5";

const clickAnimation = (theme: Theme) => keyframes`
  0%, 100% {
    background-color: transparent;
    transform: scale(1);
  }

  50% {
    background-color: ${theme.textSecondary};
    transform: scale(1.25);
  }
`;

const Container = styled("button", { shouldForwardProp: isPropValid })<{
  animateClick: boolean;
  isChecked: boolean;
}>`
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.textSecondary};
  padding: 0.2rem;

  ${({ theme, animateClick, isChecked }) => {
    if (animateClick) {
      return css`
        animation: ${clickAnimation(theme)} 0.35s ease;
      `;
    }
    if (isChecked) {
      return css`
        background-color: ${theme.textSecondary};
      `;
    }
    return css`
      &:hover {
        background-color: ${theme.backgroundTertiary};
      }
    `;
  }}
`;

const CheckMark = styled(IoCheckmark, { shouldForwardProp: isPropValid })<{
  animateClick: boolean;
  isChecked: boolean;
}>`
  ${({ theme, animateClick, isChecked }) => {
    if (animateClick || isChecked) {
      return css`
        color: ${theme.textAlt};
      `;
    }

    return css`
      color: ${theme.textSecondary};
      opacity: 0;
      transition: opacity 0.15s;

      ${Container}:hover & {
        opacity: 1;
      }
    `;
  }}
`;

export type CompletionCheckboxProps = {
  /** A callback that will be called when the checkbox gets pressed. */
  onChange: (checked: boolean) => void;
  /** Whether the checkbox is checked or not. */
  isChecked: boolean;
};

export const CompletionCheckbox = ({
  onChange,
  isChecked,
}: CompletionCheckboxProps) => {
  const [animateClick, setAnimateClick] = React.useState(false);
  const containerRef = React.useRef<HTMLButtonElement>(null);

  const onCheckboxClick = () => {
    onChange(!isChecked);
    setAnimateClick(true);

    containerRef.current?.addEventListener(
      "animationend",
      function turnOffAnimation() {
        setAnimateClick(false);

        containerRef.current?.removeEventListener(
          "animationend",
          turnOffAnimation,
        );
      },
    );
  };

  return (
    <Container
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      aria-label={`Mark the task as ${isChecked ? "incomplete" : "complete"}`}
      onClick={onCheckboxClick}
      animateClick={animateClick}
      isChecked={isChecked}
      ref={containerRef}
    >
      <CheckMark
        size="1.5rem"
        animateClick={animateClick}
        isChecked={isChecked}
      />
    </Container>
  );
};
