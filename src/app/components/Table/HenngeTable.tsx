import React from "react";
import { TableHeaderStyles, TableBodyStyles } from "./HenngeTable.theme";
import { fromISOtoFormattedTimestamp } from "../../utils/datetime";

interface IHeader {
  type: string;
  value: string;
  sorting: boolean;
}

type ICell = { key: string; value: string | HTMLElement };

type IRow = ICell[];

interface IHashKeys {
  [key: string]: number;
}

const renderCell = (cell: ICell, type: string) => {
  switch (type) {
    case "string":
      return <div css={TableBodyStyles.tableBodyCellString}>{cell.value}</div>;
    case "datetime":
      return (
        <div
          css={[
            TableBodyStyles.tableBodyCellString,
            TableBodyStyles.datetimeCell,
          ]}
        >
          {fromISOtoFormattedTimestamp(String(cell.value))}
        </div>
      );
    default:
      return "";
  }
};

const sortByKey = (row: IRow, hashKeys: IHashKeys) =>
  row.sort(
    (columnX, columnY) =>
      (hashKeys[columnX.key] || 0) - (hashKeys[columnY.key] || 0)
  );

const alignedDataByHeader = (data: IRow[], headers: IHeader[]) => {
  const initialKeyIndex: IHashKeys = {};
  /**
   * Create a hash to store the position of every header value
   */
  const hashHeaderKeys = headers.reduce((prev, curr, index) => {
    prev[curr.value] = index;
    return prev;
  }, initialKeyIndex);

  return data.map((row) => sortByKey(row, hashHeaderKeys));
};

export const HenngeTable: React.FC<{
  headers: IHeader[];
  data: IRow[];
}> = ({ headers, data }) => {
  /**
   * headerClicked
   */
  const [headerCicked, setHeaderClicked] = React.useState();
  const headersCount = headers.length || 1;
  /**
   * Align the data columns according the header position
   */
  const [dataSorted, setDataSorted] = React.useState(
    alignedDataByHeader(data, headers)
  );
  /**
   * Sort the data according the header clicked
   */

  const handleSortHeader = (dataSorted: IRow[], header: IHeader) => {
    /**Just sort if the sorting function is available. */
    // if (header.sorting) {
    //   const newDataSorted = dataSorted.sort((rowA, rowB) => {
    //     const valueA = rowA.find((cellA) => cellA.key === header.value) || "";
    //     const valueB = rowB.find((cellB) => cellB.key === header.value) || "";
    //     if (header.type === "datetime") {
    //     }
    //     // return valueA - valueB;
    //   });
    // }
  };

  return (
    <>
      {/** Header */}
      <div css={TableHeaderStyles.tableHeaderContainer}>
        {headers.map((header) => (
          <div
            key={`header-${header.value}`}
            css={TableHeaderStyles.tableHeaderCell}
            onClick={() => handleSortHeader(dataSorted, header)}
          >
            {header.value}
          </div>
        ))}
      </div>
      {/** Rows */}
      <div css={TableBodyStyles.tableBodyContainer}>
        {dataSorted.map((row, index) => (
          <div key={`Row-${index}`} css={TableBodyStyles.tableBodyRow}>
            {row.map((cell, index) => (
              <div
                key={`Cell-${cell.key}-${index}`}
                css={TableBodyStyles.tableBodyCell(headersCount)}
              >
                {renderCell(cell, headers[index].type)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
