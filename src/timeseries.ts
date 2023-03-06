export interface Config {
  time: string;
  value: string;
}

export interface Row {
  [key: string]: any;
}

export interface Model {
  data: Row[];
  time: string;
  value: string;
  last: number;
  prev: number;
  growth: number;
  runs: number;
  maxGrowthSince: number;
  maxValueSince: number;
  maxDiffSince: number;
}

export const model = function (data: Row[], config?: Config) {
  const conf = Object.assign({ time: "time", value: "value" }, config);
  let last = null,
    prev = null,
    growth = null,
    runs = null,
    maxGrowthSince = null,
    maxDiffSince = null,
    maxValueSince = null;

  // Create a copy of the data to sort it and add properties without changing original data
  data = data.map(Object.create);
  data.sort((a, b) => a[conf.time] - b[conf.time]);
  for (let i = 1; i < data.length; i++) {
    const last = data[i][conf.value];
    const prev = data[i - 1][conf.value];
    const diff = (data[i].diff = nullify(last - prev));
    // 25 to 50 is 100% growth
    // -25 to -50 is -100% growth
    // -25 to 25 is null growth
    data[i].growth =
      last > 0 && prev > 0 ? diff / prev : last < 0 && prev < 0 ? -diff / prev : null;
  }

  if (data.length >= 1) {
    data[0].diff = data[0].growth = null;

    // growth is the % growth of the last value
    last = data[data.length - 1][conf.value];
    if (data.length >= 2) prev = data[data.length - 2][conf.value];
    growth = data[data.length - 1].growth;
    const diff = data[data.length - 1].diff;

    function maxSince({ key, val: val, diff, until = 1, start = -2 }: MaxSinceConfig) {
      let count: number = 0;
      if (diff > 0)
        for (let i = data.length + start; i >= until; i--)
          if (data[i][key] <= val) count++;
          else return count;
      else if (diff < 0)
        for (let i = data.length + start; i >= until; i--)
          if (data[i][key] >= val) count++;
          else return count;
      return count > 0 ? count : null;
    }
    runs = maxSince({ key: "diff", val: 0, diff: -diff, start: -1 });
    if (!runs || runs == 1) {
      const reverseRuns = maxSince({ key: "diff", val: 0, diff: diff, start: -2 });
      if (reverseRuns !== null && reverseRuns > 1) runs = -reverseRuns;
    }
    // maxValueSince is low long ago we had such a large value
    // maxGrowthSince is how long ago we had such a large growth
    // maxDiffSince is low long ago we had such a large jump
    maxValueSince = maxSince({ key: conf.value, val: last, diff, until: 0 });
    maxGrowthSince = maxSince({ key: "growth", val: growth, diff });
    maxDiffSince = maxSince({ key: "diff", val: diff, diff });
  }

  return {
    data,
    last: nullify(last),
    prev: nullify(prev),
    growth: nullify(growth),
    runs: nullify(runs),
    maxGrowthSince: nullify(maxGrowthSince),
    maxValueSince: nullify(maxValueSince),
    maxDiffSince: nullify(maxDiffSince),
    ...conf,
  } as Model;
};

/** JSON does not support undefined, NaN or Infinity. Convert such values to null */
function nullify(value: any) {
  return typeof value == "undefined" || isNaN(value) || !isFinite(value) ? null : value;
}

interface MaxSinceConfig {
  key: string;
  val: number;
  diff: number;
  until?: number;
  start?: number;
}

import { pc, num } from "./format";
import { Narrative } from "./narratives";

export const narratives: Narrative[] = [
  {
    template: ({ growth, prev, last, value }) =>
      `${value} increased by ${pc(growth)} from ${num(prev)} to ${num(last)}.`,
    if: ({ growth }) => growth > 0,
  },
  {
    template: ({ growth, prev, last, value }) =>
      `${value} fell by ${pc(-growth)} from ${num(prev)} to ${num(last)}.`,
    if: ({ growth }) => growth < 0,
  },
  {
    template: ({ growth, prev, last, value }) =>
      `${value} remained at ${num(last)}.`,
    if: ({ growth }) => growth === 0,
  },
  {
    template: ({ growth, runs, time }) =>
      `It steadily ${growth > 0 ? "increased" : "decreased"} over ${runs} ${time}.`,
    if: ({ runs }) => runs >= 3,
  },
  {
    template: ({ growth, runs, time }) =>
      `It reversed a ${-runs} ${time} ${growth > 0 ? "degrowth" : "growth"} trend.`,
    if: ({ runs }) => runs <= -3,
  },
  {
    template: ({ growth, maxGrowthSince, time }) =>
      `It's the highest ${growth > 0 ? "growth" : "degrowth"} in ${maxGrowthSince} ${time}.`,
    if: ({ maxGrowthSince }) => maxGrowthSince >= 3,
  },
  {
    template: ({ growth, maxValueSince, value, time }) =>
      `It's the ${growth > 0 ? "highest" : "lowest"} ${value} in ${maxValueSince} ${time}.`,
    if: ({ maxValueSince }) => maxValueSince >= 3,
  },
];
