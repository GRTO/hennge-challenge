import { css } from "@emotion/core";

export const CalendarInputFieldStyles = {
  inputFieldContainer: css`
    min-width: 5rem;
    margin: 0.25rem;
  `,
};

export const DatePickerStyles = {
  datePickerContainer: css`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    border: 2px solid #ccd2d6;
    border-radius: 0.5rem;
  `,
  datePickerSeparator: css`
    padding: 0 0.5rem;
  `,
  calendarIconContainer: css`
    display: flex;
    padding: 0 0.25rem;
  `,
};
