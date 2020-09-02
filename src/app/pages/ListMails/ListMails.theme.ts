import { css } from "@emotion/core";

export const ToColumnStyles = {
  ToColumnWrapper: css`
    @media (max-width: 420px) {
      display: none;
    }
  `,
};

export const SearchStyles = {
  searchContainer: css`
    display: flex;
    align-items: center;
  `,
  iconSearch: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 2rem;
    background-color: #eff2f4;
    border-radius: 0 0.5rem 0.5rem 0;
    border-right: 2px solid #ccd2d6;
    border-top: 2px solid #ccd2d6;
    border-bottom: 2px solid #ccd2d6;
    cursor: pointer;
  `,
};

export const ResultStyles = {
  resultContainer: css`
    display: flex;
    margin: 1rem 0;
  `,
};

export const TableStyles = {
  tableContainer: css`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,
};
