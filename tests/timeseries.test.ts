import { describe, expect, test } from "@jest/globals";
import { model, Row, Model } from "../src/timeseries";

function checkNulls(result: Model) {
  expect(result.last).toBe(null);
  expect(result.prev).toBe(null);
  expect(result.growth).toBe(null);
  expect(result.runs).toBe(null);
  expect(result.maxGrowthSince).toBe(null);
  expect(result.maxValueSince).toBe(null);
  expect(result.maxDiffSince).toBe(null);
}

describe("timeseries edge cases", () => {
  test("empty data", () => {
    const data: Row[] = [];
    const result = model(data);
    expect(result.data).toStrictEqual([]);
    expect(result.time).toBe("time");
    expect(result.value).toBe("value");
    checkNulls(result);
  });
  test("single element", () => {
    const data: Row[] = [{}];
    const result = model(data);
    expect(result.data).toStrictEqual([{ diff: null, growth: null }]);
    expect(result.time).toBe("time");
    expect(result.value).toBe("value");
    checkNulls(result);
  });
  test("missing keys", () => {
    const data: Row[] = [
      { diff: null, growth: null },
      { diff: null, growth: null },
    ];
    const result = model(data);
    expect(result.data).toStrictEqual(data);
    expect(result.time).toBe("time");
    expect(result.value).toBe("value");
    checkNulls(result);
  });
});

describe("timeseries functionality", () => {
  test("growth", () => {
    const data: Row[] = [
      { t: 0, v: -1 },
      { t: 0, v: -2 },
      { t: 1, v: -1 },
      { t: 2, v: 0 },
      { t: 3, v: 1 },
      { t: 4, v: 2 },
    ];
    const cols = { time: "t", value: "v" };
    expect(model(data.slice(0, 6), cols).growth).toBe(1);
    expect(model(data.slice(0, 5), cols).growth).toBe(null);
    expect(model(data.slice(0, 4), cols).growth).toBe(null);
    expect(model(data.slice(0, 3), cols).growth).toBe(0.5);
    expect(model(data.slice(0, 2), cols).growth).toBe(-1);
  });
});
