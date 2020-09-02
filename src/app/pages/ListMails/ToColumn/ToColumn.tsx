import React from "react";
import ReactResizeDetector from "react-resize-detector";
import { IMail } from "../ListMails.interface";
import { ToColumnStyles } from "./ToColumn.theme";

const PIXELS_WORD = 8;

export const ToColumn: React.FC<{ mail: IMail }> = ({ mail }) => {
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