import { describe, expect, test } from "@jest/globals";
import { Row } from "../src/timeseries";
import { narrate, timeseries } from "../src/narratives";

describe("narrate timeseries", () => {
  test("growth", () => {
    const data: Row[] = [
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
    const cols = { time: "month", value: "NPS" };
    const result = timeseries.model(data, cols);
    expect(narrate(result, timeseries.narratives)).toBe(
      "NPS fell by 1.3% from 77 to 76. It reversed a 3 month growth trend. It's the highest degrowth in 3 month."
    );
  });
});
