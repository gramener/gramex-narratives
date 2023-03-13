import { describe, expect, test } from "@jest/globals";
import { pc, pc0, pc1, num, num0, num2, dmy, mdy, dm, md, wdmy, and, or } from "../src/format";

describe("percent", () => {
  /*
    | `pc`     | `pc0`      | `pc1`     |
    |---------:|-----------:|----------:|
    | 0.38%    | 0%         | 0.4%      |
    | 3.8%     | 4%         | 3.8%      |
    | 38%      | 38%        | 38.1%     |
    | 381%     | 381%       | 381.0%    |
  */
  test("pc", () => {
    expect(pc(0.00381)).toBe("0.38%");
    expect(pc(0.0381)).toBe("3.8%");
    expect(pc(0.381)).toBe("38%");
    expect(pc(3.81)).toBe("381%");
  });
  test("pc0", () => {
    expect(pc0(0.00381)).toBe("0%");
    expect(pc0(0.0381)).toBe("4%");
    expect(pc0(0.381)).toBe("38%");
    expect(pc0(3.81)).toBe("381%");
  });
  test("pc1", () => {
    expect(pc1(0.00381)).toBe("0.4%");
    expect(pc1(0.0381)).toBe("3.8%");
    expect(pc1(0.381)).toBe("38.1%");
    expect(pc1(3.81)).toBe("381.0%");
  });
});

describe("number", () => {
  /*
    | `num`   | `num0`     | `num2`       |
    |--------:|-----------:|-------------:|
    | 0.038   | 0          | 0.04         |
    | 3.8     | 4          | 3.81         |
    | 381     | 381        | 381.04       |
    | 38K     | 38,104     | 38,103.69    |
    | 3.8M    | 3,810,369  | 3,810,369.24 |
  */
  test("num", () => {
    expect(num(0.0381036924)).toBe("0.038");
    expect(num(3.81036924)).toBe("3.8");
    expect(num(381.036924)).toBe("381");
    expect(num(38103.6924)).toBe("38K");
    expect(num(3810369.24)).toBe("3.8M");
  });
  test("num0", () => {
    expect(num0(0.0381036924)).toBe("0");
    expect(num0(3.81036924)).toBe("4");
    expect(num0(381.036924)).toBe("381");
    expect(num0(38103.6924)).toBe("38,104");
    expect(num0(3810369.24)).toBe("3,810,369");
  });
  test("num2", () => {
    expect(num2(0.0381036924)).toBe("0.04");
    expect(num2(3.81036924)).toBe("3.81");
    expect(num2(381.036924)).toBe("381.04");
    expect(num2(38103.6924)).toBe("38,103.69");
    expect(num2(3810369.24)).toBe("3,810,369.24");
  });
});

describe("date", () => {
  /*
    | `dmy`       | `mdy`        | `dm`   | `md`   | `wdmy`           |
    |------------:|-------------:|-------:|-------:|-----------------:|
    | 23 Jan 2023 | Jan 23, 2023 | 23 Jan | Jan 23 | Mon, 23 Jan 2023 |
  */
  test("dmy", () => {
    expect(dmy(new Date(2023, 0, 23))).toBe("23 Jan 2023");
  });
  test("mdy", () => {
    expect(mdy(new Date(2023, 0, 23))).toBe("Jan 23, 2023");
  });
  test("dm", () => {
    expect(dm(new Date(2023, 0, 23))).toBe("23 Jan");
  });
  test("md", () => {
    expect(md(new Date(2023, 0, 23))).toBe("Jan 23");
  });
  test("wdmy", () => {
    expect(wdmy(new Date(2023, 0, 23))).toBe("Mon, 23 Jan 2023");
  });
});

describe("list", () => {
  /*
    | `and`        | `or`        |
    |--------------|-------------|
    | X, Y, and Z  | X, Y, or Z  |
  */
  test("and", () => {
    expect(and(["X", "Y", "Z"])).toBe("X, Y, and Z");
  });
  test("or", () => {
    expect(or(["X", "Y", "Z"])).toBe("X, Y, or Z");
  });
});
