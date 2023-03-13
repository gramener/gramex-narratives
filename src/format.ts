const _formatNumber = (fn: Intl.NumberFormat) => (v: number) => fn.format(v);
const _formatDate = (fn: Intl.DateTimeFormat) => (v: Date) => fn.format(v);
const _formatList = (fn: Intl.ListFormat) => (v: any[]) => fn.format(v);

export const pc = _formatNumber(
  new Intl.NumberFormat("en-US", {
    style: "percent",
    notation: "compact",
    compactDisplay: "short",
  })
);
export const pc0 = _formatNumber(
  new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 0,
  })
);
export const pc1 = _formatNumber(
  new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })
);

export const num = _formatNumber(
  new Intl.NumberFormat("en-US", {
    style: "decimal",
    notation: "compact",
    compactDisplay: "short",
  })
);
export const num0 = _formatNumber(
  new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    maximumFractionDigits: 0,
  })
);
export const num2 = _formatNumber(
  new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
);

export const dmy = _formatDate(
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" })
);
export const mdy = _formatDate(
  new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" })
);
export const dm = _formatDate(new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }));
export const md = _formatDate(new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short" }));
export const wdmy = _formatDate(
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
);

export const and = _formatList(
  new Intl.ListFormat("en-US", { style: "long", type: "conjunction" })
);
export const or = _formatList(new Intl.ListFormat("en-US", { style: "long", type: "disjunction" }));
