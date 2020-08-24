import { fromISOtoMilliseconds } from "./datetime";

const ASC = "ASC";
const DESC = "DESC";

export const getOrder = (
  prevStatus: { key: string; order: string },
  valueKey: string
) => {
  if (prevStatus.key === valueKey) {
    return prevStatus.order === ASC ? DESC : ASC;
  }
  return ASC;
};
export const compareString = (
  stringA: string,
  stringB: string,
  order: string = ASC
) => {
  if (stringA.toLowerCase() > stringB.toLowerCase()) {
    return 1 * (order === ASC ? 1 : -1);
  }
  if (stringA.toLowerCase() < stringB.toLowerCase()) {
    return -1 * (order === ASC ? 1 : -1);
  }
  return 0;
};

export const compareDatetime = (
  timestampA: string,
  timestampB: string,
  order: string = ASC
) => {
  const millisecondsA = fromISOtoMilliseconds(timestampA);
  const millisecondsB = fromISOtoMilliseconds(timestampB);
  return (millisecondsA - millisecondsB) * (order === ASC ? 1 : -1);
};
