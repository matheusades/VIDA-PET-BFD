require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.static('public'));


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

app.get('/mariadb/read', async (req, res) => {
  let conn;
  const start = Date.now();

  try {
    conn = await pool.getConnection();

    const rows = await conn.query('SELECT * FROM usuarios_teste');

    const tempo = Date.now() - start;

    res.json({
      banco: 'MariaDB',
      tipo: 'leitura',
      tempo_ms: tempo,
      total: rows.length
    });

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
// ENDPOINT DE ESCRITA – MariaDB
// ===============================
app.get('/mariadb/create', async (req, res) => {
  let conn;
  const start = Date.now();

  try {
    conn = await pool.getConnection();

    await conn.query(
      'INSERT INTO usuarios_teste (nome, email) VALUES (?, ?)',
      ['Teste', `teste_${Date.now()}@email.com`]
    );

    const tempo = Date.now() - start;
    res.json({ tempo_ms: tempo });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// ===============================
// ENDPOINT DE ESCRITA – MongoDB
// ===============================
app.get('/mongodb/create', async (req, res) => {
  const start = Date.now();
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();

    const db = client.db(); // usa o banco definido na URI
    const collection = db.collection('usuarios_teste');

    await collection.insertOne({
      nome: 'Teste',
      email: `teste_${Date.now()}@email.com`,
      created_at: new Date()
    });

    const tempo = Date.now() - start;
    res.json({ tempo_ms: tempo });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});


app.get('/mongodb/read', async (req, res) => {
  const start = Date.now();
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();

    const db = client.db();
    const collection = db.collection('usuarios_teste');

    const docs = await collection.find({}).toArray();

    const tempo = Date.now() - start;
    res.json({
      banco: 'MongoDB',
      tipo: 'leitura',
      tempo_ms: tempo,
      total: docs.length
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
