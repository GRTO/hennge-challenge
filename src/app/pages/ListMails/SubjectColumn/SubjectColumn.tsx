import React from "react";
import { IMail } from "../ListMails.interface";
import { Icon } from "../../../components/Icon/Icon";
import ClipSVG from "../../../../assets/images/icon_clip.svg";
import { SubjetColumnStyles } from "./SubjectColumn.theme";

export const SubjectColumn: React.FC<{ mail: IMail }> = ({mail}) => {
  return (
    <div css={SubjetColumnStyles.subjectContainer}>
      <div css={SubjetColumnStyles.subjectText}>{mail.subject}</div>
      {mail.files.length > 0 ? (
        <div>
          <Icon src={ClipSVG} />
        </div>
      ) : null}
    </div>
  );
};