import React from "react";
import { TableHeaderStyles, TableBodyStyles } from "./HenngeTable.theme";
import { fromISOtoFormattedTimestamp } from "../../utils/datetime";
import {
  compareDatetime,
  compareString,
  getOrder,
} from "../../utils/datatable";
import { Icon } from "../Icon/Icon";
import upArrow from "../../../assets/images/icon_arrow01.svg";
import { TableEmptyMessage } from "./TableEmptyMessage/TableEmptyMessage";

interface IHeader {
  type: string;
  value: string;
  sorting: boolean;
}

type ICell = {
  key: string;
  value: string | number;
  renderElement: string | number | JSX.Element;
};

type IRow = ICell[];

interface IHashKeys {
  [key: string]: number;
}

const renderOrderIcon = (order: string) => (
  <Icon src={upArrow} css={TableHeaderStyles.sortingHeaderIcon(order)} />
);

const renderCell = (cell: ICell, type: string) => {
  switch (type) {
    case "element":
      return (
        <div css={TableBodyStyles.tableBodyCellElement}>
          {cell.renderElement}
        </div>
      );
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
  const [headerClicked, setHeaderClicked] = React.useState({
    key: "",
    order: "",
  });
  const headersCount = headers.length || 1;
  /**
   * Align the data columns according the header position
   */
  const [dataSorted, setDataSorted] = React.useState(
    alignedDataByHeader(data, headers)
  );
  /**
   * Update if any value has changed
   */
  React.useEffect(() => {
    setDataSorted(alignedDataByHeader(data, headers));
  }, [data, headers]);
  /**
   * Sort the data according the header clicked
   */
  const handleSortHeader = (dataSorted: IRow[], header: IHeader) => {
    /**Just sort if the sorting function is available. */
    if (header.sorting) {
      /** Get the order */
      const order = getOrder(headerClicked, header.value);
      /** Set the last order in the table */
      setHeaderClicked({ key: header.value, order });
      /** Sort the array */
      const newDataSorted = dataSorted.sort((rowA, rowB) => {
        const valueA = rowA.find((cellA) => cellA.key === header.value) || {
          key: header.value,
          value: "",
        };
        const valueB = rowB.find((cellB) => cellB.key === header.value) || {
          key: header.value,
          value: "",
        };
        if (header.type === "datetime") {
          return compareDatetime(
            String(valueA.value),
            String(valueB.value),
            order
          );
        } else if (header.type === "string" || header.type === "element") {
          return compareString(
            String(valueA.value),
            String(valueB.value),
            order
          );
        }
        return Number(valueA.value) - Number(valueB.value);
      });
      setDataSorted(newDataSorted);
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <>
          {/** Header */}
          <div css={TableHeaderStyles.tableHeaderContainer}>
            {headers.map((header, index) => (
              <div
                key={`header-${header.value}`}
                css={TableHeaderStyles.tableHeaderCell(
                  headerClicked.key === header.value
                )}
                onClick={() => handleSortHeader(dataSorted, header)}
              >
                <div
                  css={TableHeaderStyles.tableHeaderCellValue(
                    index === headers.length - 1
                  )}
                >
                  <div>{header.value}</div>
                  {headerClicked.key === header.value
                    ? renderOrderIcon(headerClicked.order)
                    : ""}
                </div>
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
      ) : (
        <TableEmptyMessage />
      )}
    </>
  );
};
