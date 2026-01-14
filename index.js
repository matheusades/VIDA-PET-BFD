require('dotenv').config();

const express = require('express');
const app = express();

const mariadb = require('mariadb');
const { MongoClient } = require('mongodb');

// ===============================
// Pool MariaDB
// ===============================
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

// ===============================
// Health check – MariaDB
// ===============================
app.get('/health/mariadb', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('SELECT 1');
    res.json({ status: 'MariaDB conectado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// ===============================
// ENDPOINT DE LEITURA – MariaDB
// (Tarefa 2 – Aluno 2)
// ===============================
app.get('/mariadb/read', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();

    // Leitura simples
    const rows = await conn.query('SELECT * FROM pets');

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// ===============================
// Health check – MongoDB
// ===============================
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

// ===============================
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
