import { css } from "@emotion/core";
import { ASC } from "../../utils/datatable";

export const TableHeaderStyles = {
  tableHeaderContainer: css`
    display: flex;
  `,
  tableHeaderCell: (clicked: boolean) => css`
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 1rem;
    background-color: #eff2f4;
    border-top: 2px solid #ccd2d6;
    border-bottom: 2px solid #ccd2d6;
    min-height: 3rem;
    font-weight: ${clicked ? "bold" : "normal"};
  `,
  sortingHeaderIcon: (order: string) => css`
    transform: ${order === ASC ? "rotate(180deg)" : ""};
    margin: 0 0.5rem;
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
      color: rgb(26, 13, 171) !important;
      i {
        filter: brightness(0.5) sepia(1) hue-rotate(140deg) saturate(6);
      }
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
    flex-grow: 1;
  `,
  tableBodyCellElement: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-grow: 1;
  `,
  datetimeCell: css`
    color: #000 !important;
  `,
};
