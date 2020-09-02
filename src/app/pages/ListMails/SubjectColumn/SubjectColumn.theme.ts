import { css } from "@emotion/core";

export const SubjetColumnStyles = {
  subjectContainer: css`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
  `,
  subjectText: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};