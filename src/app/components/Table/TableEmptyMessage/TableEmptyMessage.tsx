import React from "react";
import { Icon } from "../../Icon/Icon";
import LogoMailPNG from "../../../../assets/images/logo.png";
import { TableEmptyStyles } from "./TableEmptyMessage.theme";

export const TableEmptyMessage = () => (
  <div css={TableEmptyStyles.emptyMessageContainer}>
    <Icon src={LogoMailPNG} size={{ height: "7rem", width: "7rem" }} />
  </div>
);
