# @theredhead/dateformat

- [@theredhead/dateformat](#theredheaddateformat)
  - [Purpose](#purpose)
  - [Features](#features)
  - [Caveats](#caveats)
  - [Usage](#usage)
    - [the `dateFormat` function](#the-dateformat-function)
    - [The `dateHelper` instance](#the-datehelper-instance)
    - [the `DateHelper` class](#the-datehelper-class)

## Purpose

Make working with the built-in `Date` class a little bit more tolerable.

## Features

- Source code freely available: https://github.com/theredhead/dateformat#features
- Provides a `dateFormat(date: Date, formatString: string): string` function that takes a format just like PHP's `date_format` function.
- Format string placeholders:

_This is **almost** straight from the [php documentation](https://www.php.net/manual/en/datetime.format.php)_
| Char | Description |
|--|--|
| `d` | Day of the month, 2 digits with leading zeros
| `D` | A textual representation of a day, three letters
| `j` | Day of the month without leading zeros
| `l` | A full textual representation of the day of the week
| `N` | ISO-8601 numeric representation of the day of the week
| `S` | English ordinal suffix for the day of the month, 2 characters
| `w` | Numeric representation of the day of the week
| `z` | The day of the year (starting from 0)
| `W` | ISO-8601 week number of year, weeks starting on Monday
| `F` | A full textual representation of a month, such as January or March
| `m` | Numeric representation of a month, with leading zeros
| `M` | A short textual representation of a month, three letters
| `n` | Numeric representation of a month, without leading zeros
| `t` | Number of days in the given month
| `L` | Whether it's a leap year
| `o` | ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead
| `Y` | A full numeric representation of a year, 4 digits
| `y` | A two digit representation of a year
| `a` | Lowercase Ante meridiem and Post meridiem
| `A` | Uppercase Ante meridiem and Post meridiem
| `B` | Swatch Internet time
| `g` | 12-hour format of an hour without leading zeros
| `G` | 24-hour format of an hour without leading zeros
| `h` | 12-hour format of an hour with leading zeros
| `H` | 24-hour format of an hour with leading zeros
| `i` | Minutes with leading zeros
| `s` | Seconds with leading zeros
| `u` | Microseconds
| `v` | Milliseconds
| `O` | Difference to Greenwich time (GMT) without colon between hours and minutes
| `P` | Difference to Greenwich time (GMT) with colon between hours and minutes
| `p` | The same as P, but returns Z instead of +00:00
| `Z` | Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive.
| `c` | ISO 8601 date
| `r` | RFC 2822 formatted date ("Thu, 21 Dec 2000 16:01:07 +0200")
| `U` | Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)

## Caveats

My implementation is almost, but not quite entirely, complete. I am still missing a few options that I don't really want to support as it would involve tracking a bunch of data:

| Char | Description | note |
|--|--|--|
| `e` | Timezone identifier | **NOT IMPLEMENTED**
| `I` | Whether or not the date is in daylight saving time | **NOT IMPLEMENTED**
| `T` | Timezone abbreviation | **NOT IMPLEMENTED**

Furthermore, the unittests are fairly basic (as of 2021-03-13)

## Usage

There are several ways you could use this package:

### the `dateFormat` function

If all you need is a quick formatting of a date here and there, you could get away with just importing the `dateFormat` funtion and forgetting about everything else.

The function expects two arguments; a `Date` instance and a string witht he required formatting characters as described above.

```typescript
  import { dateFormat } from '@theredhead/dateformat';

  const date = new Date();
  console.log("It is " + dateFormat(date, "H:i:s")); // It is 18:43:51
```

### The `dateHelper` instance

If you might need to do some more `Date` inspection, you may want to use the same `dateHelper` instance that the exported function uses

```typescript
  import { dateHelper } from '@theredhead/dateformat';

  function schedule(dueDate, task) {
    if (! dateHelper.isDate(dueDate)) {
      throw new Error('Expected a Date.');
    }
    // ...
  }
  console.log("It is " + dateFormat(date, "H:i:s")); // It is 18:43:51
```

### the `DateHelper` class

If you just want to break stuff, import the `DateHelper` class. Maybe extend it or bend it to your will in some novel way I haven't thought of yet.
