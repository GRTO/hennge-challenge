import React from "react";
import { IMail } from "../ListMails.interface";
import { DateTimeStyles } from "./DateTimeColumn.theme";
import { fromISOtoFormattedTimestamp } from "../../../utils/datetime";

export const DateTimeColumn: React.FC<{ mail: IMail }> = ({ mail }) => (
  <div css={DateTimeStyles.datetimeContainer}>
    {fromISOtoFormattedTimestamp(mail.timestamp)}
  </div>
);
