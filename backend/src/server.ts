import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { itemsRouter, statsRouter } from './routes';

const app = express();
const PORT = parseInt(process.env.PORT || '4001', 10);

app.use(
  cors({ origin: `http://localhost:${process.env.FRONTEND_PORT || 5173}` }),
);
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/items', itemsRouter);
app.use('/api/stats', statsRouter);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
