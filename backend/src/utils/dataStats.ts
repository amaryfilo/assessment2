import { TStatsCache, IStats } from '../types';
import { mean, readItems } from '.';

const CACHE_TTL = 60_000;
let statsCache: TStatsCache | null = null;

export const calculateStats = async (): Promise<IStats> => {
  if (statsCache && Date.now() - statsCache.timestamp < CACHE_TTL) {
    console.log('Stats cached');
    return { total: statsCache.total, averagePrice: statsCache.averagePrice };
  }

  const items = await readItems();

  const prices = items.map((item) => item.price);
  const averagePrice = mean(prices);

  statsCache = {
    total: items.length,
    averagePrice,
    timestamp: Date.now(),
  };

  return {
    total: statsCache.total,
    averagePrice: statsCache.averagePrice,
  };
};

export const cleatStatsCache = (): void => {
  statsCache = null;
  console.log('Stats cache cleared');
};
