/**
 * DateHelper
 *
 * Provide date formatting following php's Date.format example.
 *
 * @format
 */

export class DateHelper {
  private monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  private shortMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  private dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  private shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  monthName(date: Date): string {
    return this.monthNames[date.getMonth()];
  }

  monthNameAbbreviation(date: Date): string {
    return this.shortMonthNames[date.getMonth()];
  }

  weekDayName(date: Date): string {
    return this.dayNames[date.getDay()];
  }

  isoWeekDayNumber(date: Date): number {
    return date.getDay();
  }

  isoWeekNumber(date: Date): number {
    // @see https://weeknumber.net/how-to/javascript
    const copy = new Date(date.getTime());
    copy.setHours(0, 0, 0, 0);
    copy.setDate(copy.getDate() + 3 - ((copy.getDay() + 6) % 7));
    const firstWeek = new Date(copy.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((copy.getTime() - firstWeek.getTime()) / 86400000 -
          3 +
          ((firstWeek.getDay() + 6) % 7)) /
          7
      )
    );
  }

  isoYearNumber(date2: Date): number {
    // @see https://weeknumber.net/how-to/javascript
    const copy = new Date(date2.getTime());
    copy.setDate(copy.getDate() + 3 - ((copy.getDay() + 6) % 7));
    return copy.getFullYear();
  }

  dayAbbreviation(date: Date): string {
    return this.shortDayNames[date.getDay()];
  }

  dayNumberOfYear(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(
      (((date as unknown) as number) - ((onejan as unknown) as number)) /
        86400000
    );
  }

  dayOrdinalSuffix(date: Date): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const n = date.getDate() % 100;

    return suffixes[(n - 20) % 10] || suffixes[n] || suffixes[0];
  }

  swatchBeats(date: Date): number {
    return Math.floor(
      ((((date.getUTCHours() + 1) % 24) +
        date.getUTCMinutes() / 60 +
        date.getUTCSeconds() / 3600) *
        1000) /
        24
    );
  }

  timezoneOffset(date: Date, seperator = ":"): string {
    const offset = date.getTimezoneOffset();
    const hh = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
    const mm = String(offset % 60).padStart(2, "0");

    return [offset >= 0 ? "+" : "-", hh, seperator, mm].join("");
  }

  timezoneOffsetOrZulu(date: Date): string {
    const offset = this.timezoneOffset(date, ":");
    return offset == "+00:00" ? "Z" : offset;
  }

  weekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(
      ((((date as unknown) as number) - ((onejan as unknown) as number)) /
        86400000 +
        onejan.getDay() +
        1) /
        7
    );
  }

  isLeapYear(date: Date): boolean {
    const yr = date.getFullYear();

    if (yr % 4 === 0) {
      if (yr % 100 === 0) {
        if (yr % 400 !== 0) {
          return false;
        }
        if (yr % 400 === 0) {
          return true;
        }
      }
      if (yr % 100 !== 0) {
        return true;
      }
    }
    if (yr % 4 !== 0) {
      return false;
    }
    return false;
  }

  numberOfDaysInMonth(date: Date): number {
    const numberOfDaysPerMonth = [
      31,
      this.isLeapYear(date) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    return numberOfDaysPerMonth[date.getMonth()];
  }

  format(date: Date, dateFormat: string): string {
    const RFC2022 = "D, d M Y H:i:s O";
    // 'r' is a special case: D, d M Y H:i:s O
    const dateFormatChars = dateFormat.replace(/([^\\]r)|r/, RFC2022).split("");

    const day = date.getDate();
    const month = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hours2 = String(hours).padStart(2, "0");
    const minutes2 = String(minutes).padStart(2, "0");
    const seconds2 = String(seconds).padStart(2, "0");

    const replacements: { [key: string]: string } = {
      // Day of the month, 2 digits with leading zeros
      d: String(day < 10 ? "0" + day : day),

      // A textual representation of a day, three letters
      D: this.dayAbbreviation(date),

      // Day of the month without leading zeros
      j: String(date.getDate()),

      // A full textual representation of the day of the week
      l: this.weekDayName(date),

      // ISO-8601 numeric representation of the day of the week
      N: String(this.isoWeekDayNumber(date)),

      // English ordinal suffix for the day of the month, 2 characters
      S: this.dayOrdinalSuffix(date),

      // Numeric representation of the day of the week
      w: String(date.getDay()),

      // The day of the year (starting from 0)
      z: String(this.dayNumberOfYear(date)),

      // ISO-8601 week number of year, weeks starting on Monday
      W: String(this.weekNumber(date)),

      // A full textual representation of a month, such as January or March
      F: String(this.monthName(date)),

      //Numeric representation of a month, with leading zeros
      m: month < 10 ? "0" + (month + 1) : String(month + 1),

      // A short textual representation of a month, three letters
      M: this.monthNameAbbreviation(date),

      // Numeric representation of a month, without leading zeros
      n: String(month + 1),

      // Number of days in the given month
      t: String(this.numberOfDaysInMonth(date)),

      // Whether it's a leap year
      L: this.isLeapYear(date) ? "1" : "0",

      // ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead
      o: String(this.isoYearNumber(date)),

      // A full numeric representation of a year, 4 digits
      Y: String(date.getFullYear()),

      // A two digit representation of a year
      y: date.getFullYear() + "".substring(2, 4),

      // Lowercase Ante meridiem and Post meridiem
      a: hours > 12 ? "pm" : "am",

      // Uppercase Ante meridiem and Post meridiem
      A: hours > 12 ? "PM" : "AM",

      // Swatch Internet time
      B: String(this.swatchBeats(date)),

      // 12-hour format of an hour without leading zeros
      g: hours % 12 > 0 ? String(hours % 12) : String(12),

      // 24-hour format of an hour without leading zeros
      G: hours > 0 ? String(hours) : "12",

      // 12-hour format of an hour with leading zeros
      h: hours % 12 > 0 ? String(hours % 12) : String(12),

      // 24-hour format of an hour with leading zeros
      H: hours2,

      // Minutes with leading zeros
      i: minutes2,

      // Seconds with leading zeros
      s: seconds2,

      // Microseconds
      u: String(date.getMilliseconds() % 1000),

      // Milliseconds
      v: String(date.getMilliseconds()),

      // Timezone identifier
      // @TODO: e: "",

      // Whether or not the date is in daylight saving time
      // @TODO: I: "",

      // Difference to Greenwich time (GMT) without colon between hours and minutes
      O: this.timezoneOffset(date, ""),

      // Difference to Greenwich time (GMT) with colon between hours and minutes
      P: this.timezoneOffset(date, ":"),

      // The same as P, but returns Z instead of +00:00
      p: this.timezoneOffsetOrZulu(date),

      // Timezone abbreviation
      // @TODO: T: "",

      // Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive.
      Z: String(60 * date.getTimezoneOffset()),

      // ISO 8601 date
      // c: this.format(date, "Y-m-d H:i:s"),

      // RFC 2822 formatted date ("Thu, 21 Dec 2000 16:01:07 +0200")
      // r: this.format(date, "D, d M Y H:i:s O"),

      // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
      U: String(Math.floor(date.getTime() / 1000)),
    };

    // loop through format array of characters and add matching data else add the format character (:,/, etc.)
    let result = "";
    for (let index = 0; index < dateFormatChars.length; index++) {
      const char = dateFormatChars[index];
      if (char === "\\") {
        result += dateFormatChars[index + 1];
        index++;
      } else if (char.match(/[a-zA-Z]/g)) {
        result += replacements[char] ? replacements[char] : char;
      } else {
        result += char;
      }
    }

    return result;
  }

  formatMySqlDate(date: Date) {
    return this.format(date, "Y-m-d");
  }

  formatMySqlDateTime(date: Date) {
    return this.format(date, "Y-m-d H:i:s");
  }

  isDate(value: any) {
    return value instanceof Date || typeof value?.getDate === "function";
  }
}
