import React from "react";
import { HenngeTable } from "../../components/Table/HenngeTable";
import mockData from "../../../data/mockData.json";
import { Icon } from "../../components/Icon/Icon";
import ClipSVG from "../../../assets/images/icon_clip.svg";
import SearchSVG from "../../../assets/images/icon_search.svg";
import RedirectArrowSVG from "../../../assets/images/icon_arrow02.svg";
import MailSVG from "../../../assets/images/icon_mail_sp.svg";
import {
  SubjetColumnStyles,
  ToColumnStyles,
  SearchStyles,
  TableStyles,
  ResultStyles,
  FromColumnStyles,
  DateTimeStyles,
} from "./ListMails.theme";
import ReactResizeDetector from "react-resize-detector";
import { HenngeDatePicker } from "../../components/DatePicker/HenngeDatePicker";
import { isBetween, fromISOtoFormattedTimestamp } from "../../utils/datetime";

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
  const [emailCount, setEmailCount] = React.useState(0);
  /**Investigate our ellipsis */
  const handleElipsis = (width: number) => {
    const minWords = numberOfWords(width);
    /**Just one element show ellipsis */
    const { text, words } = mail.to.for.reduce(
      (prev, curr, index) => {
        if (prev.text.length <= minWords) {
          const addingEmail = prev.text + (index > 0 ? ", " : "") + curr;
          if (addingEmail.length <= minWords) {
            return { text: addingEmail, words: prev.words + 1 };
          }
          if (
            prev.text === "" &&
            index === mail.to.for.length - 1 &&
            mail.to.for.length > 0
          ) {
            setOnEmail(true);
            return { text: mail.to.for[0], words: prev.words + 1 };
          }
          if (
            prev.text.length - minWords <= 2 &&
            index === mail.to.for.length - 1
          ) {
            setOnEmail(false);
            return { text: prev.text + ", ...", words: prev.words };
          }
        }
        return prev;
      },
      { text: "", words: 0 }
    );
    setShowText(text);
    setEmailCount(mail.to.for.length - words);
  };
  return (
    <>
      <div css={ToColumnStyles.ToContainer}>
        <div css={ToColumnStyles.ToText(oneEmail)}>{showText}</div>
        {emailCount > 0 ? (
          <div css={ToColumnStyles.ToCountText}>+{emailCount}</div>
        ) : null}
      </div>
      <div css={ToColumnStyles.ToContainer}>
        <ReactResizeDetector onResize={handleElipsis}>
          <div css={ToColumnStyles.ToFullText}>{mail.to.for.join(", ")}</div>
        </ReactResizeDetector>
        <div css={ToColumnStyles.ToCountContainer}>
          {emailCount > 0 ? (
            <div css={ToColumnStyles.ToCountText}> +{emailCount}</div>
          ) : null}
        </div>
      </div>
    </>
  );
};

const FromColumn: React.FC<{ mail: IMail }> = ({ mail }) => (
  <div css={FromColumnStyles.fromFullContainer}>
    <div css={FromColumnStyles.inboxIconContainer}>
      <Icon src={MailSVG} size={{ height: "2rem", width: "2rem" }} />
    </div>
    <div css={FromColumnStyles.descriptionContainer}>
      <div css={FromColumnStyles.fromContainer}>
        <div css={FromColumnStyles.fromSection}>{mail.from}</div>
        <div css={FromColumnStyles.datetimeContainer}>
          <div css={FromColumnStyles.datetimeSection}>
            {fromISOtoFormattedTimestamp(mail.timestamp)}
          </div>
          <div css={FromColumnStyles.actionSection}>
            <Icon
              src={RedirectArrowSVG}
              size={{ height: "0.5rem", width: "0.5rem" }}
            />
          </div>
        </div>
      </div>
      <div css={FromColumnStyles.toColumn}>
        <ToColumn mail={mail} />
      </div>
    </div>
  </div>
);

const DateTimeColumn: React.FC<{ mail: IMail }> = ({ mail }) => (
  <div css={DateTimeStyles.datetimeContainer}>
    {fromISOtoFormattedTimestamp(mail.timestamp)}
  </div>
);

interface IRangeDate {
  startDate: string;
  endDate: string;
}

const formatDatatableObject = (rangeDate: IRangeDate) =>
  mockData.data
    .filter((mail) =>
      isBetween(rangeDate.startDate, rangeDate.endDate, mail.timestamp)
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
        renderElement: renderSubjectAttchedFiles(mail),
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
  const [dataEmails, setDataEmails] = React.useState(
    formatDatatableObject(rangeDate)
  );
  const header = [
    { type: "element", value: "From", sorting: true },
    { type: "element", value: "To", sorting: true },
    { type: "element", value: "Subject", sorting: false },
    { type: "element", value: "Date", sorting: true },
  ];

  const handleSearchEvent = () => {
    setDataEmails(formatDatatableObject(rangeDate));
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
