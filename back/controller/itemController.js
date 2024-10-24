import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const pgp = pgPromise();

const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const getItems = async (req, res) => {
  try {
    const items = await db.any('SELECT * FROM ferramentas');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send('Erro ao obter itens');
  }
};

export default getItems;