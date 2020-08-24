import { css } from "@emotion/core";

export const TableHeaderStyles = {
  tableHeaderContainer: css`
    display: flex;
  `,
  tableHeaderCell: css`
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 1rem;
    background-color: #eff2f4;
    border-top: 2px solid #ccd2d6;
    border-bottom: 2px solid #ccd2d6;
    min-height: 3rem;
  `,
};

export const TableBodyStyles = {
  tableBodyContainer: css`
    display: flex;
    flex-direction: column;
  `,
  tableBodyRow: css`
    display: flex;
    flex: 1;
    flex-flow: row wrap;
    align-items: center;
    min-height: 3rem;
    border-bottom: 2px solid #ccd2d6;
    &:hover {
      cursor: pointer;
      background-color: #fafbfc;
      color: rgb(26, 13, 171);
    }
  `,
  tableBodyCell: (headersCount: number) => css`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    align-items: center;
    flex: 1;
    overflow: hidden;
    min-height: 3rem;
    width: calc(100% / ${headersCount});
  `,
  tableBodyCellString: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  datetimeCell: css`
    color: #000 !important;
  `,
};
