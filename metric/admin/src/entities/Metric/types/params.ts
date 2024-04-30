export interface GenericParam {
  name: string;
}

export interface ITextParam extends GenericParam {
  type: MetricParamType.text;
  value: string;
}

export interface ITextArrayParam extends GenericParam {
  type: MetricParamType.textArray;
  value: string[];
}

export interface INumberParam extends GenericParam {
  type: MetricParamType.number;
  value: number;
}

export interface IDateParam extends GenericParam {
  type: MetricParamType.date;
  value: Date;
}

export interface IBooleanParam extends GenericParam {
  type: MetricParamType.boolean;
  value: boolean;
}

export enum UnitOfTime {
  seconds = "seconds",
  minutes = "minutes",
  hours = "hours",
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
}

export interface IDurationParam extends GenericParam {
  type: MetricParamType.duration;
  value: {
    number: number;
    unitOfTime: UnitOfTime;
  };
}

export type IMetricParam =
  | ITextParam
  | ITextArrayParam
  | INumberParam
  | IDateParam
  | IDurationParam
  | IBooleanParam;

export enum MetricParamType {
  text = "text",
  textArray = "textArray",
  number = "number",
  date = "date",
  duration = "duration",
  boolean = "boolean",
}

export interface MetricParamData {
  label?: string;
  placeholder?: string;
  tooltip?: string;
}
