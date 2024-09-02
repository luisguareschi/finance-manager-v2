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

export interface IDebtor {
  id: number;
  name: string;
  created_by: number;
}

export interface IDebt {
  id: number;
  user: number;
  description: string;
  amount: number;
  debtor: IDebtor;
  created: string;
}

export interface ICreateDebt {
  description: string;
  amount: number | string;
  debtor: string | number;
  created: Date;
}
