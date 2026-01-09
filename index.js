require('dotenv').config();

const express = require('express');
const app = express();

const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

app.get('/health/mariadb', async (req, res) => {
  let conn;
  try {
    conn = await mariadb.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    await conn.query('SELECT 1');
    res.json({ status: 'MariaDB conectado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.end();
  }
});
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

const { MongoClient } = require('mongodb');

app.get('/health/mongodb', async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    await client.db().command({ ping: 1 });
    res.json({ status: 'MongoDB conectado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});