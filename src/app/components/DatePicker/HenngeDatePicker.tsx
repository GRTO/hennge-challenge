import React from "react";
import DatePicker from "react-datepicker";
import ReactDatePicker from "react-datepicker";
// Using this as default styles
import "react-datepicker/dist/react-datepicker.css";
import {
  CalendarInputFieldStyles,
  DatePickerStyles,
} from "./HenngeDatePicker.theme";
import { Icon } from "../Icon/Icon";
import IconCalendar from "../../../assets/images/icon_calender.svg";
import { fromLocalJSONDateToUTCFormat } from "../../utils/datetime";

const CalendarInputField: React.FC<{
  value: Date;
  toggleDatePicker: () => void;
}> = React.forwardRef(({ value, toggleDatePicker }, ref) => (
  <div
    onClick={toggleDatePicker}
    ref={ref as any}
    css={CalendarInputFieldStyles.inputFieldContainer}
  >
    {value}
  </div>
));

const START_DATE = "START_DATE";
const END_DATE = "END_DATE";

export const HenngeDatePicker: React.FC<{
  handleDateSelection: (dateRange: {
    startDate: string;
    endDate: string;
  }) => void;
}> = ({ handleDateSelection }) => {
  // Handle the start date
  const [startDate, setStartDate] = React.useState(new Date());
  // Handle the end date
  const [endDate, setEndDate] = React.useState(new Date());
  // Datepicker tooltip is closed by default
  const [datePickerStartIsOpen, setdatePickerStartOpen] = React.useState(false);
  const [datePickerEndIsOpen, setdatePickerEndOpen] = React.useState(false);
  // Reference to the Datepicker
  const datePickerStartRef = React.useRef<ReactDatePicker>(null);
  const datePickerEndRef = React.useRef<ReactDatePicker>(null);
  // Function show or hide the datepicker tooltip
  const toggleDatePickerStart = () => {
    datePickerStartRef.current!.setOpen(!datePickerStartIsOpen);
    setdatePickerStartOpen(!datePickerStartIsOpen);
  };
  const toggleDatePickerEnd = () => {
    datePickerEndRef.current!.setOpen(!datePickerEndIsOpen);
    setdatePickerEndOpen(!datePickerEndIsOpen);
  };
  const onChangeDate = (date: Date, dateIndex: string) => {
    if (dateIndex === START_DATE) {
      setStartDate(date);
      handleDateSelection({
        startDate: fromLocalJSONDateToUTCFormat(date, "start"),
        endDate: fromLocalJSONDateToUTCFormat(endDate, "end"),
      });
    } else {
      setEndDate(date);
      handleDateSelection({
        startDate: fromLocalJSONDateToUTCFormat(startDate, "start"),
        endDate: fromLocalJSONDateToUTCFormat(date, "end"),
      });
    }
  };
  return (
    <>
      <div css={DatePickerStyles.datePickerContainer}>
        {/** Calendar Icon */}
        <div css={DatePickerStyles.calendarIconContainer}>
          <Icon src={IconCalendar} />
        </div>
        {/** Start time */}
        <DatePicker
          ref={datePickerStartRef}
          startOpen={datePickerStartIsOpen}
          selected={startDate}
          selectsStart
          onChange={(date: Date) => onChangeDate(date, START_DATE)}
          shouldCloseOnSelect={false}
          startDate={startDate}
          endDate={endDate}
          customInput={
            <CalendarInputField
              value={startDate}
              toggleDatePicker={toggleDatePickerStart}
            />
          }
        />
        {/** Separator */}
        <div css={DatePickerStyles.datePickerSeparator}>{"-"}</div>
        {/** End time */}
        <DatePicker
          ref={datePickerEndRef}
          startOpen={datePickerEndIsOpen}
          selected={endDate}
          selectsEnd
          onChange={(date: Date) => onChangeDate(date, END_DATE)}
          shouldCloseOnSelect={false}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          customInput={
            <CalendarInputField
              value={endDate}
              toggleDatePicker={toggleDatePickerEnd}
            />
          }
        />
      </div>
    </>
  );
};
