import { css } from "@emotion/core";

export const FromColumnStyles = {
  fromFullContainer: css`
    display: flex;
    flex-grow: 1;
  `,
  fromContainer: css`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    @media (max-width: 420px) {
      font-weight: bold;
    }
  `,
  descriptionContainer: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    @media (max-width: 420px) {
      width: calc(100% - 40px);
    }
  `,
  datetimeContainer: css`
    display: flex;
    align-items: center;
    @media (min-width: 420px) {
      display: none;
    }
  `,
  inboxIconContainer: css`
    display: flex;
    align-items: center;
    width: 40px;
    @media (min-width: 420px) {
      display: none;
    }
  `,
  datetimeSection: css`
    display: flex;
  `,
  fromSection: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    @media (max-width: 420px) {
      max-width: 70%;
    }
  `,
  actionSection: css`
    display: flex;
  `,
  toColumn: css`
    @media (min-width: 420px) {
      display: none;
    }
  `,
};
