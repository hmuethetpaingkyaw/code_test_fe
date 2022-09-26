import { css, Global } from "@emotion/react";
export const globalStyle = (
  <Global
    styles={css`
      .form-control {
        color: hsl(0, 0%, 20%) !important;
      }
    `}
  />
);
