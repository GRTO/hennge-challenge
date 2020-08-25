import React from "react";
import { HenngeTable } from "../../components/Table/HenngeTable";
import mockData from "../../../data/mockData.json";
import { Icon } from "../../components/Icon/Icon";
import ClipSVG from "../../../assets/images/icon_clip.svg";
import { SubjetColumnStyles, ToColumnStyles } from "./ListMails.theme";

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

const ToColumn: React.FC<{ mail: IMail }> = ({ mail }) => {
  const cellRef = React.useRef<HTMLDivElement | null>(null);
  React.useLayoutEffect(() => {
    console.log(cellRef.current?.textContent);
  }, [cellRef]);
  return (
    <>
      <div css={ToColumnStyles.ToContainer}>
        <div css={ToColumnStyles.ToText} ref={cellRef}>
          {mail.to.for.join(", ")}
        </div>
      </div>
    </>
  );
};

export const ListMailsView: React.FC = () => {
  const header = [
    { type: "string", value: "From", sorting: true },
    { type: "element", value: "To", sorting: true },
    { type: "element", value: "Subject", sorting: false },
    { type: "datetime", value: "Date", sorting: true },
  ];
  const data = mockData.data.map((mail) => [
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
  ]);

  return <HenngeTable headers={header} data={data} />;
};
