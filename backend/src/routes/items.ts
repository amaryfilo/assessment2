import { Router } from 'express';
import fs from 'fs/promises';
import { z } from 'zod';

import { Item } from '../types';
import { DATA_PATH, readItems } from '../utils/dataStore';

const router = Router();

const ItemSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
});

// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    const { limit, q } = req.query;
    let items = await readItems();

    // Only by name
    if (q && typeof q === 'string')
      items = items.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase()),
      );

    // Limit not good option, we can use page instead of limit.
    if (limit) {
      const _limit = +limit;
      if (!isNaN(_limit)) items = items.slice(0, _limit);
    }

    res.json(items);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const items = await readItems();
    const item = items.find((i) => i.id === +req.params.id);

    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post('/', async (req, res, next) => {
  try {
    // Validate data
    const validatedData = ItemSchema.parse(req.body);

    const items = await readItems();
    const _item: Item = { ...validatedData, id: Date.now() };

    items.push(_item);

    // Update items
    await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2));

    res.status(201).json(_item);
  } catch (err) {
    next(err);
  }
});

export default router;
