/** @jsxImportSource @emotion/react */
import { css, Global, useTheme } from "@emotion/react/macro";
import React from "react";

const GlobalDynamicStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${theme.scrollbarBackground};
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme.scrollbarThumb};
          border-radius: 10px;
        }
      `}
    />
  );
};

export default GlobalDynamicStyles;
