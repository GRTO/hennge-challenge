import { css } from "@emotion/core";

export const DateTimeStyles = {
  datetimeContainer: css`
    display: flex;
    align-items: center;
    @media (max-width: 420px) {
      display: none;
    }
  `,
};