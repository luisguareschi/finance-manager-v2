export interface IDebtSummary {
  total: number;
  last_updated: string;
  debtors: {
    id: number;
    name: string;
    total: number;
    last_updated: string;
  }[];
}
