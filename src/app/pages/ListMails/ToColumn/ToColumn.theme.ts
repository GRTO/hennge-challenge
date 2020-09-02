import { css } from "@emotion/core";

export const ToColumnStyles = {
  ToColumnWrapper: css`
    @media (max-width: 420px) {
      display: none;
    }
  `,
  ToContainer: css`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
  `,
  ToText: (ellipsis: boolean) => css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ${ellipsis ? "ellipsis" : "break-spaces"};
  `,
  ToFullText: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 0px;
  `,
  ToCountContainer: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 0px;
  `,
  ToCountText: css`
    background-color: #808080;
    color: #fff;
    font-weight: bold;
    border-radius: 0.25rem;
    padding: 0 0.25rem;
  `,
};