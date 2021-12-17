/* eslint-disable react/function-component-definition */
import styled from "@emotion/styled";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.main};
  font-size: 1.4rem;
  text-decoration: underline;
  cursor: pointer;
  border-radius: 2px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.focus};
  }
`;

const StyledRouterLink = StyledAnchor.withComponent(RouterLink);

type RouterLinkProps = React.ComponentProps<typeof RouterLink>;
type AnchorLinkProps = React.ComponentProps<"a">;

function isRouterLinkProps(
  props: RouterLinkProps | AnchorLinkProps,
): props is RouterLinkProps {
  return "to" in props && !("href" in props);
}

/**
 * It is a styled link component. The link type (an anchor element or a
 * router link) determines by the presence and the absence of the `to` and the
 * `href` attributes.
 */
function StyledLink(props: RouterLinkProps): JSX.Element;
function StyledLink(props: AnchorLinkProps): JSX.Element;
function StyledLink(props: RouterLinkProps | AnchorLinkProps) {
  if (isRouterLinkProps(props)) {
    return <StyledRouterLink {...props} />;
  }

  return <StyledAnchor {...props} />;
}

export default StyledLink;
