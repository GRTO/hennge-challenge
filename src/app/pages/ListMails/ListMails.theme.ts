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
    background-color: #eff2f4;
    border-radius: 0.5rem;
    border: 2px solid #ccd2d6;
    cursor: pointer;
    padding: 0 10px;
    @media (min-width: 420px) {
      height: 2rem;
      width: 2rem;
      border-radius: 0 0.5rem 0.5rem 0;
      border: none;
      border-left: 2px solid #ccd2d6;
      padding: 0;
    }
  `,
  inputContainer: css`
    @media (max-width: 420px) {
      display: flex;
      flex: 1;
      padding: 10px 0;
    }
  `,
  labelSearch: css`
    display: flex;
    margin: 0.25rem;
    font-weight: 600;
    @media (min-width: 420px) {
      display: none;
    }
  `,
  filterSection: css`
    display: flex;
    border: 2px solid #ccd2d6;
    border-radius: 0.5rem;
    flex-wrap: wrap;
    justify-content: space-between;
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
