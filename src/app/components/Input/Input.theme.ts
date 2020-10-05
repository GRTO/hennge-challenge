import { css } from "@emotion/core";

export const InputStyles = {
  inputContainer: css`
    display: inline-block;
    outline: none;
    border: none;
    font-size: 16px;
    background-color: transparent;

    @media (min-width: 615px) {
      width: 300px;
    }

    &::placeholder {
      color: #9ea2b2;
    }
  `,
  inputWrapper: css`
    display: flex;
    flex: 1;
    align-items: center;
    border-bottom: 2px solid #e6e7ed;
    height: 30px;
  `,
};
