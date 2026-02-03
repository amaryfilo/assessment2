import path from 'path';
import fs from 'fs/promises';

import { Item } from '../types';

export const DATA_PATH = path.join(__dirname, '../../../data/items.json');

export const readItems = async (): Promise<Item[]> => {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
};
