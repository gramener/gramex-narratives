# Formatters

JavaScript supports the [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
object to format numbers, dates, lists, etc. based on locale.

Here are common formats.

## Percentages

|  `pc` | `pc0` |  `pc1` |
| ----: | ----: | -----: |
| 0.38% |    0% |   0.4% |
|  3.8% |    4% |   3.8% |
|   38% |   38% |  38.1% |
|  381% |  381% | 381.0% |

- `pc.format(value)`: **2-3 significant digits**: `381%`, `38.1%`, `3.81%`
  - People typically need just 2-3 digits to understand percentages.
  - `pc = new Intl.NumberFormat("en-US", { style: "percent", notation: "compact", "compactDisplay": "short" })`
- `pc0.format(value)`: **0 decimals**: `381%`, `38%`, `4%`
  - Use when values are typically between 10-100% and never below 1%
  - `pc0 = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 0 })`
- `pc1.format(value)`: **1 decimal**: `381.0%`, `38.1%`, `3.8%`
  - Use when values are typically between 1-10% and never below 0.1%
  - `pc1 = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1, minimumFractionDigits: 1})`

[Create your own using `Intl.NumberFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)

## Numbers

| `num` |    `num0` |       `num2` |
| ----: | --------: | -----------: |
| 0.038 |         0 |         0.04 |
|   3.8 |         4 |         3.81 |
|   381 |       381 |       381.04 |
|   38K |    38,104 |    38,103.69 |
|  3.8M | 3,810,369 | 3,810,369.24 |

- `num.format(value)`: **2-3 significant digits**: `381`, `38K`, `3.8M`
  - People typically need just 2-3 digits to understand numbers.
  - `num = new Intl.NumberFormat("en-US", { style: "decimal", notation: "compact", compactDisplay: "short" })`
- `num0.format(value)`: **0 decimals**: `381`, `38,104`, `3,810,369`
  - Use when values are typically between 1 - 1,000,000
  - `num0 = new Intl.NumberFormat("en-US", { style: "decimal", grouping: "always", maximumFractionDigits: 0 })`
- `num2.format(value)`: **2 decimals**: `381.04`, `38,103.69`, `3,810,369.24`
  - Use when values are typically between 1 - 1,000
  - `num2 = new Intl.NumberFormat("en-US", { style: "decimal", grouping: "always", maximumFractionDigits: 2, minimumFractionDigits: 2 })`

[Create your own using `Intl.NumberFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)

## Dates

|       `dmy` |        `mdy` |   `dm` |   `md` |           `wdmy` |
| ----------: | -----------: | -----: | -----: | ---------------: |
| 23 Jan 2023 | Jan 23, 2023 | 23 Jan | Jan 23 | Mon, 23 Jan 2023 |

- `dmy.format(value)`: **Day Month Year**: `23 Jan 2023`
  - `dmy = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" })`
- `mdy.format(value)`: **Month Day Year**: `Jan 23, 2023`
  - `mdy = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" })`
- `dm.format(value)`: **Day Month**: `23 Jan`
  - `dm = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" })`
- `md.format(value)`: **Month Day**: `Jan 23`
  - `md = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short" })`
- `wdmy.format(value)`: **Weekday Day Month Year**: `Mon, 23 Jan 2023`
  - `wdmy = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })`

[Create your own using `Intl.DateTimeFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)

## Relative Times

As of March 2023, [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat)
does not support output like `3 days, 6 hours ago`. Instead, use:

- [Luxon `.toRelative()`](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toRelative)
- [date-fns `formatRelative()`](https://date-fns.org/v2.29.3/docs/formatRelative)

[See alternatives](https://blog.logrocket.com/4-alternatives-to-moment-js-for-internationalizing-dates/).

## Lists

| `and`       | `or`       |
| ----------- | ---------- |
| X, Y, and Z | X, Y, or Z |

- `and.format(value)`: **List with "and"**: `X, Y and Z`
  - `and = new Intl.ListFormat("en-US", { style: "long", type: "conjunction" })`
- `or.format(value)`: **List with "or"**: `X, Y or Z`
  - `or = new Intl.ListFormat("en-US", { style: "long", type: "disjunction" })`

[Create your own using `Intl.ListFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat)
