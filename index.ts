export * as format from "./src/format";
export * as timeseries from "./src/timeseries";

export interface Narrative {
  name?: string,
  template: (model: any) => string;
  if?: (model: any) => boolean;
}

export function narrate(model: any, narratives: Narrative[], separator: string = " ") {
  return narratives
    .filter((n) => n.if ? n.if(model) : true)
    .map((n) => n.template(model))
    .join(separator);
}
