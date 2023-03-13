# Time series

E.g. population by year. It has a number (population) and a label (year) for time.

## Narratives

Time may have multiple periods (e.g. month, quarter, year). These narratives apply for each period:

- `growth`:
  - "NPS increased by 4% from 75 to 78." if `growth >= minGrowth` (default: 0)
  - "NPS fell by 3.8% from 78 to 75." if `growth <= -minGrowth` (default: 0)
  - "NPS remained at 75." if `growth` is between -minGrowth and minGrowth (default: 0)
- `runs`:
  - "It steadily increased over 3 months." if `runs >= minRuns` (default: 3)
  - "It reversed a 3-month growth trend." if `runs <= -minRuns` (default: 3)
- `maxGrowth`: "It's the highest growth in 3 months." if `maxGrowthSince >= minSince` (default: 3)
- `maxValue`: "It's the highest NPS in 3 months." if `maxValueSince >= minSince` (default: 3)
- `maxDiff`: "It's the biggest rise in 3 months." if `maxDiffSince >= minSince` (default: 3)

## Usage

```js
const data = [
  { month: "Jan", NPS: 78 },
  { month: "Feb", NPS: 75 },
  { month: "Mar", NPS: 77 },
  { month: "Apr", NPS: 78 },
  { month: "May", NPS: 80 },
  { month: "Jun", NPS: 82 },
  { month: "Jul", NPS: 84 },
  { month: "Aug", NPS: 70 },
  { month: "Sep", NPS: 72 },
  { month: "Oct", NPS: 73 },
  { month: "Nov", NPS: 77 },
  { month: "Dec", NPS: 76 },
];
const model = timeseries.model(data, {
  time: "month",  // name of the label key
  value: "NPS",   // name of the number key
  periods: {      // TODO: compare with the previous value in these periods
    "month": 1,
    "quarter": 3,
    "year": 12,
  },
});
const story = narrate({ ...model, minGrowth = 0, minRuns = 3, minSince = 3 }, timeseries.narratives)
console.log(story.map(v => v.text).join(" "))
```

## Model

The model is an object with these properties:

- `data`: a copy of the original data, sorted ascending by the `time` key.
  - 2 properties are added to each object:
    - `diff`: the difference between this and the previous `value`
    - `growth`: the percentage change between this and the previous `value`
  - Example: `data.at(-1).growth` has the most recent growth.
- `time`: the label key passed to the model, e.g. `"month"`
- `value`: the value key passed to the model, e.g. `"NPS"`
- `last`: the most recent value. Same as `data.at(-1).value`
- `prev`: the previous value. Same as `data.at(-2).value`
- `growth`: the most recent growth. Same as `data.at(-1).growth`
- `runs`: the number of most recent consecutive values with the same/reverse trend.
  - Example: `runs` is 3 if the last value decreased and the previous 2 also decreased.
  - Example: `runs` is -3 if the last value increased but the previous 2 all decreased.
- `maxGrowthSince`: how long ago we had such a large growth (as an absolute value)
  - Example: `maxGrowthSince` is 1 if the previous value had the largest growth.
  - Example: `maxGrowthSince` is 2 if the value before that had the largest growth.
- `maxValueSince`: number. how long ago we had such a large value (as an absolute value)
  - Example: `maxValueSince` is 1 if the previous value had the largest value.
  - Example: `maxValueSince` is 2 if the value before that had the largest value.
- `maxDiffSince`: number. how long ago we had such a large difference (as an absolute value)
  - Example: `maxDiffSince` is 1 if the previous value had the largest difference.
  - Example: `maxDiffSince` is 2 if the value before that had the largest difference.

If a value is undefined/missing, infinity, or not a number, it becomes `null`.

## Source

[timeseries.ts](../src/timeseries.ts ":include :type=code")
