import React from "react";
import { IMail } from "../ListMails.interface";
import { Icon } from "../../../components/Icon/Icon";
import { fromISOtoFormattedTimestamp } from "../../../utils/datetime";
import { ToColumn } from "../ToColumn/ToColumn";
import RedirectArrowSVG from "../../../../assets/images/icon_arrow02.svg";
import MailSVG from "../../../../assets/images/icon_mail_sp.svg";
import { FromColumnStyles } from "./FromColumn.theme";

export const FromColumn: React.FC<{ mail: IMail }> = ({ mail }) => (
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