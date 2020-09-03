import React from "react";
import { HenngeTable } from "../../components/Table/HenngeTable";
import mockData from "../../../data/mockData.json";
import { Icon } from "../../components/Icon/Icon";
import SearchSVG from "../../../assets/images/icon_search.svg";
import {
  ToColumnStyles,
  SearchStyles,
  TableStyles,
  ResultStyles,
} from "./ListMails.theme";
import { HenngeDatePicker } from "../../components/DatePicker/HenngeDatePicker";
import { isBetween } from "../../utils/datetime";
import { ToColumn } from "./ToColumn/ToColumn";
import { FromColumn } from "./FromColumn/FromColumn";
import { DateTimeColumn } from "./DateTimeColumn/DateTimeColumn";
import { IRangeDate } from "./ListMails.interface";
import { SubjectColumn } from "./SubjectColumn/SubjectColumn";
import { isWordOnEmail } from "../../utils/email";
import { debounce } from "lodash";

const formatDatatableObject = (rangeDate: IRangeDate, word: string) =>
  mockData.data
    .filter(
      (mail) =>
        isBetween(rangeDate.startDate, rangeDate.endDate, mail.timestamp) &&
        isWordOnEmail(mail, word)
    )
    .map((mail) => [
      {
        key: "From",
        value: mail.from,
        renderElement: <FromColumn mail={mail} />,
      },
      {
        key: "To",
        value: mail.to.for.join(", "),
        renderElement: (
          <div css={ToColumnStyles.ToColumnWrapper}>
            <ToColumn mail={mail} />
          </div>
        ),
      },
      {
        key: "Subject",
        value: mail.subject,
        renderElement: <SubjectColumn mail={mail} />,
      },
      {
        key: "Date",
        value: mail.timestamp,
        renderElement: <DateTimeColumn mail={mail} />,
      },
    ]);

export const ListMailsView: React.FC = () => {
  const [rangeDate, setRangeDate] = React.useState({
    startDate: "",
    endDate: "",
  });
  const [wordsIncluded, setWordsIncluded] = React.useState("");
  const debounceSetWord = React.useCallback(
    debounce((text) => setWordsIncluded(text), 300),
    []
  );
  const [dataEmails, setDataEmails] = React.useState(
    formatDatatableObject(rangeDate, wordsIncluded)
  );

  const header = [
    { type: "element", value: "From", sorting: true },
    { type: "element", value: "To", sorting: true },
    { type: "element", value: "Subject", sorting: false },
    { type: "element", value: "Date", sorting: true },
  ];

  const handleSearchEvent = () =>
    setDataEmails(formatDatatableObject(rangeDate, wordsIncluded));

  return (
    <>
      {/**Search section */}
      <div css={SearchStyles.searchContainer}>
        <input onChange={(e) => debounceSetWord(e.target.value)} />
        <HenngeDatePicker
          handleDateSelection={(rangeDateSelection) => {
            setRangeDate(rangeDateSelection);
          }}
        />
        <div css={SearchStyles.iconSearch} onClick={handleSearchEvent}>
          <Icon src={SearchSVG} />
        </div>
      </div>
      {/**Number of elements */}
      <div css={ResultStyles.resultContainer}>
        Results: {dataEmails.length} mail(s)
      </div>
      {/**Table section*/}
      <div css={TableStyles.tableContainer}>
        <HenngeTable headers={header} data={dataEmails} />
      </div>
    </>
  );
};
