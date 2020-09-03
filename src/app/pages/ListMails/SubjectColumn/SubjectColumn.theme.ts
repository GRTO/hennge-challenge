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
  bodyText: css`
    opacity: 0.7;
    @media (max-width: 420px) {
      display: none;
    }
  `,
};

export const BodyRowStyles = {
  bodyTextMobile: css`
    opacity: 0.7;
    display: none;
    @media (max-width: 420px) {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  `,
};
