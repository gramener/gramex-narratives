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
  last: number | null;
  prev: number | null;
  growth: number | null;
  runs: number;
  maxGrowthSince: number;
  maxValueSince: number;
  maxDiffSince: number;
}

export const model = function (data: Row[], config?: Config) {
  const conf = Object.assign({ time: "time", value: "value" }, config);
  let last: number | null = null,
    prev: number | null = null,
    growth: number | null = null,
    runs: number = 0,
    maxGrowthSince: number = 0,
    maxDiffSince: number = 0,
    maxValueSince: number = 0;

  // Create a copy of the data to sort it and add properties without changing original data
  data = data.map(Object.create);
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

    function countBack(
      check: (v: Row) => boolean,
      { until = 1, init = 0 }: { until?: number; init?: number } = {}
    ) {
      let count: number = 0;
      for (let i = data.length - 2; i >= until; i--) {
        if (check(data[i])) count = (count || init) + 1;
        else break;
      }
      return count;
    }
    if (diff > 0) {
      runs = countBack((v) => v.diff >= 0) || -countBack((v) => v.diff <= 0);
      maxValueSince = countBack((v) => (last as number) > v[conf.value], { until: 0, init: 1 });
      maxGrowthSince = countBack((v) => (growth as number) > v.growth, { init: 1 });
      maxDiffSince = countBack((v) => (diff as number) > v.diff, { init: 1 });
    } else if (diff < 0) {
      runs = countBack((v) => v.diff <= 0) || -countBack((v) => v.diff >= 0);
      maxValueSince = countBack((v) => (last as number) < v[conf.value], { until: 0, init: 1 });
      maxGrowthSince = countBack((v) => (growth as number) < v.growth, { init: 1 });
      maxDiffSince = countBack((v) => (diff as number) < v.diff, { init: 1 });
    }
  }

  return {
    data,
    last: nullify(last),
    prev: nullify(prev),
    growth: nullify(growth),
    runs,
    maxGrowthSince,
    maxValueSince,
    maxDiffSince,
    ...conf,
  } as Model;
};

// JSON does not support undefined, NaN or Infinity. Convert such values to null
function nullify(value: any) {
  return typeof value == "undefined" || isNaN(value) || !isFinite(value) ? null : value;
}

import { pc, num } from "./format";
import { Template } from "../index";

export const narratives: Template[] = [
  {
    name: "growth",
    template: ({ growth, prev, last, value }) =>
      `${value} increased by ${pc(growth)} from ${num(prev)} to ${num(last)}.`,
    if: ({ growth, minGrowth = 0 }) => growth >= minGrowth,
  },
  {
    name: "growth",
    template: ({ growth, prev, last, value }) =>
      `${value} fell by ${pc(-growth)} from ${num(prev)} to ${num(last)}.`,
    if: ({ growth, minGrowth = 0 }) => growth <= -minGrowth,
  },
  {
    name: "growth",
    template: ({ growth, prev, last, value }) => `${value} remained at ${num(last)}.`,
    if: ({ growth, minGrowth = 0 }) => growth < minGrowth && growth > -minGrowth,
  },
  {
    name: "runs",
    template: ({ growth, runs, time }) =>
      `It steadily ${growth > 0 ? "increased" : "decreased"} over ${runs} ${time}.`,
    if: ({ runs, minRuns = 3 }) => runs >= minRuns,
  },
  {
    name: "runs",
    template: ({ growth, runs, time }) =>
      `It reversed a ${-runs} ${time} ${growth > 0 ? "degrowth" : "growth"} trend.`,
    if: ({ runs, minRuns = 3 }) => runs <= -minRuns,
  },
  {
    name: "maxGrowth",
    template: ({ growth, maxGrowthSince, time }) =>
      `It's the highest ${growth > 0 ? "growth" : "degrowth"} in ${maxGrowthSince} ${time}.`,
    if: ({ maxGrowthSince, minSince = 3 }) => maxGrowthSince >= minSince,
  },
  {
    name: "maxValue",
    template: ({ growth, maxValueSince, value, time }) =>
      `It's the ${growth > 0 ? "highest" : "lowest"} ${value} in ${maxValueSince} ${time}.`,
    if: ({ maxValueSince, minSince = 3 }) => maxValueSince >= minSince,
  },
  {
    name: "maxDiff",
    template: ({ growth, maxDiffSince, time }) =>
      `It's the biggest ${growth > 0 ? "rise" : "fall"} in ${maxDiffSince} ${time}.`,
    if: ({ maxDiffSince, minSince = 3 }) => maxDiffSince >= minSince,
  },
];
