export interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface IStats {
  total: number;
  averagePrice: number;
}

export type TStatsCache = IStats & { timestamp: number };
