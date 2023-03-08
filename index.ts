export * as format from "./src/format";
export * as timeseries from "./src/timeseries";

export interface Template {
  name?: string;
  template: (model: any) => string;
  if?: (model: any) => boolean;
}

export interface Narrative {
  name?: string;
  text: string;
}

export function narrate(model: any, narratives: Template[]) {
  return narratives
    .filter((n) => (n.if ? n.if(model) : true))
    .map((n) => {
      const narrative: Narrative = {
        name: n.name,
        text: n.template(model),
      };
      return narrative
    })
}
