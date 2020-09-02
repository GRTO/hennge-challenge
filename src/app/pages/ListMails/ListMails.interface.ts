export interface IMail {
  from: string;
  to: { for: string[]; cc: string[]; cco: string[] };
  subject: string;
  body: string;
  files: string[];
  timestamp: string;
}

export interface IRangeDate {
  startDate: string;
  endDate: string;
}