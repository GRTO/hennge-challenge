import React from "react";
import { HenngeTable } from "../../components/Table/HenngeTable";
import mockData from "../../../data/mockData.json";
import { Icon } from "../../components/Icon/Icon";
import ClipSVG from "../../../assets/images/icon_clip.svg";
import SearchSVG from "../../../assets/images/icon_search.svg";
import {
  SubjetColumnStyles,
  ToColumnStyles,
  SearchStyles,
  TableStyles,
  ResultStyles,
} from "./ListMails.theme";
import ReactResizeDetector from "react-resize-detector";
import { HenngeDatePicker } from "../../components/DatePicker/HenngeDatePicker";
import { isBetween } from "../../utils/datetime";

interface IMail {
  from: string;
  to: { for: string[]; cc: string[]; cco: string[] };
  subject: string;
  body: string;
  files: string[];
  timestamp: string;
}

const renderSubjectAttchedFiles = (mail: IMail) => {
  const hasFiles = mail.files.length > 0;
  return (
    <div css={SubjetColumnStyles.subjectContainer}>
      <div css={SubjetColumnStyles.subjectText}>{mail.subject}</div>
      {hasFiles ? (
        <div>
          <Icon src={ClipSVG} />
        </div>
      ) : null}
    </div>
  );
};

const PIXELS_WORD = 8;

const ToColumn: React.FC<{ mail: IMail }> = ({ mail }) => {
  const numberOfWords = (width: number) => Math.floor(width / PIXELS_WORD);
  const [showText, setShowText] = React.useState(mail.to.for.join(", "));
  const [oneEmail, setOnEmail] = React.useState(false);
  /**Investigate our ellipsis */
  const handleElipsis = (width: number) => {
    const minWords = numberOfWords(width);
    /**Just one element show ellipsis */
    setShowText(
      mail.to.for.reduce((prev, curr, index) => {
        if (prev.length <= minWords) {
          const addingEmail = prev + (index > 0 ? ", " : "") + curr;
          if (addingEmail.length <= minWords) {
            return addingEmail;
          }
          if (
            prev === "" &&
            index === mail.to.for.length - 1 &&
            mail.to.for.length > 0
          ) {
            setOnEmail(true);
            return mail.to.for[0];
          }
          if (prev.length - minWords <= 2 && index === mail.to.for.length - 1) {
            setOnEmail(false);
            return prev + ", ...";
          }
        }
        return prev;
      }, "")
    );
  };
  return (
    <>
      <div css={ToColumnStyles.ToContainer}>
        <div css={ToColumnStyles.ToText(oneEmail)}>{showText}</div>
      </div>
      <ReactResizeDetector onResize={handleElipsis}>
        <div css={ToColumnStyles.ToContainer}>
          <div css={[ToColumnStyles.ToFullText, { height: "0px" }]}>
            {mail.to.for.join(", ")}
          </div>
        </div>
      </ReactResizeDetector>
    </>
  );
};

export const ListMailsView: React.FC = () => {
  const [rangeDate, setRangeDate] = React.useState({
    startDate: "",
    endDate: "",
  });
  const [dataEmails, setDataEmails] = React.useState(
    mockData.data.map((mail) => [
      {
        key: "From",
        value: mail.from,
        renderElement: mail.from,
      },
      {
        key: "To",
        value: mail.to.for.join(", "),
        renderElement: <ToColumn mail={mail} />,
      },
      {
        key: "Subject",
        value: mail.subject,
        renderElement: renderSubjectAttchedFiles(mail),
      },
      { key: "Date", value: mail.timestamp, renderElement: mail.timestamp },
    ])
  );
  const header = [
    { type: "string", value: "From", sorting: true },
    { type: "element", value: "To", sorting: true },
    { type: "element", value: "Subject", sorting: false },
    { type: "datetime", value: "Date", sorting: true },
  ];

  const handleSearchEvent = () => {
    setDataEmails(
      mockData.data
        .filter((mail) =>
          isBetween(rangeDate.startDate, rangeDate.endDate, mail.timestamp)
        )
        .map((mail) => [
          {
            key: "From",
            value: mail.from,
            renderElement: mail.from,
          },
          {
            key: "To",
            value: mail.to.for.join(", "),
            renderElement: <ToColumn mail={mail} />,
          },
          {
            key: "Subject",
            value: mail.subject,
            renderElement: renderSubjectAttchedFiles(mail),
          },
          { key: "Date", value: mail.timestamp, renderElement: mail.timestamp },
        ])
    );
  };

  return (
    <>
      {/**Search section */}
      <div css={SearchStyles.searchContainer}>
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
