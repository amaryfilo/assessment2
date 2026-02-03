import express from 'express';

import { calculateStats } from '../utils';
import { IStats } from '../types';

const router = express.Router();

// GET /api/stats
router.get('/', async (_req, res) => {
  const stats: IStats = await calculateStats();
  res.json(stats);
});

export default router;
