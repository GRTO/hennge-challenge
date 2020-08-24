import { DateTime } from "luxon";

const UTC_ZONE = "UTC";
const FULL_DATE = "y-LL-dd";
const HOUR_MIN = "HH:mm";
const MONTH_DAY = "LLL dd";

/**
 * Verify if the `timestamp` is inside the current date
 * @param timestamp It is a string with the value of the timestamp to convert
 * @param zone  As default it is `UTC`, but you can set the zone of the current value of the timestamp.
 *  Here is the list of valid timezones: https://moment.github.io/luxon/docs/manual/zones
 */
const isInsideDay = (timestamp: string, zone: string = UTC_ZONE) => {
  const now = DateTime.utc();
  const datetime = DateTime.fromISO(timestamp, { zone });
  return now.toFormat(FULL_DATE) === datetime.toFormat(FULL_DATE);
};

/**
 * Verify if the `timestamp` is inside the current month
 * @param timestamp It is a string with the value of the timestamp to convert
 * @param zone  As default it is `UTC`, but you can set the zone of the current value of the timestamp.
 *  Here is the list of valid timezones: https://moment.github.io/luxon/docs/manual/zones
 */
const isInsideMonth = (timestamp: string, zone: string = UTC_ZONE) => {
  const now = DateTime.utc();
  const datetime = DateTime.fromISO(timestamp, { zone });
  return now.toFormat("y-LL") === datetime.toFormat("y-LL");
};

/**
 * This function return a date format. It will be `HH:mm` if the timestamp is inside the current day.
 * `LLL dd` if the timestamp is inside the current month or `y-LL-dd` if the timestamp is outside the current month.
 * @param timestamp It is a string with the value of the timestamp to convert
 * @param zone As default it is `UTC`, but you can set the zone of the current value of the timestamp.
 *  Here is the list of valid timezones: https://moment.github.io/luxon/docs/manual/zones
 */
const getTimestampFormat = (timestamp: string, zone: string = UTC_ZONE) =>
  ["day", "month", "year"].reduce((prev, curr) => {
    if (prev === "") {
      if (curr === "day" && isInsideDay(timestamp, zone)) {
        return HOUR_MIN;
      } else if (curr === "month" && isInsideMonth(timestamp, zone)) {
        return MONTH_DAY;
      } else if (curr === "year") {
        return FULL_DATE;
      }
      return prev;
    }
    return prev;
  }, "");

/**
 * Convert the timestamp to a special format
 * @param timestamp It is a string with the value of the timestamp to convert
 * @param zone As default it is `UTC`, but you can set the zone of the current value of the timestamp.
 *  Here is the list of valid timezones: https://moment.github.io/luxon/docs/manual/zones
 * @returns the timestamp with the format that has been selected.
 * If the timestamp is not valid, the function will return an empty string.
 */
export const fromISOtoFormattedTimestamp = (
  timestamp: string,
  zone: string = UTC_ZONE
) => {
  const format = getTimestampFormat(timestamp, zone);
  const timestampConvertion = DateTime.fromISO(timestamp, { zone });
  return timestampConvertion.isValid
    ? timestampConvertion.toFormat(format)
    : "";
};
