import { describe, expect, test } from "@jest/globals";
import { model, narratives, Row } from "../src/timeseries";
import { narrate } from "../src/narratives";

describe("narrate timeseries", () => {
  test("growth", () => {
    const data: Row[] = [
      { month: "Jan", nps: 78 },
      { month: "Feb", nps: 75 },
      { month: "Mar", nps: 77 },
      { month: "Apr", nps: 78 },
      { month: "May", nps: 80 },
      { month: "Jun", nps: 82 },
      { month: "Jul", nps: 84 },
      { month: "Aug", nps: 70 },
      { month: "Sep", nps: 72 },
      { month: "Oct", nps: 73 },
      { month: "Nov", nps: 77 },
      { month: "Dec", nps: 76 },
    ];
    const cols = { time: "month", value: "nps" };
    const result = model(data, cols);
    expect(narrate(result, narratives)).toBe(
      "nps increased by -1.3% from 77 to 76. It reversed a 3 month growth trend. It's the highest degrowth in 3 month."
    );
  });
});
