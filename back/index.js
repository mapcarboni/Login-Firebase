import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import itemRouter from './routes/itemRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/', itemRouter);

app.get('/', (req, res) => {
  res.send('Servidor voando!!!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});