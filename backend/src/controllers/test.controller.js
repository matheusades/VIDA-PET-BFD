const mariaPool = require('../config/mariadb');
const mongoose = require('mongoose');

exports.testMaria = async (req, res) => {
  const inicio = Date.now();

  const conn = await mariaPool.getConnection();
  const rows = await conn.query('select * from pets limit 10');
  conn.release();

  res.json({
    banco: 'mariadb',
    tempo_ms: Date.now() - inicio,
    registros: rows.length
  });
};

const PetSchema = new mongoose.Schema({ nome: String });

const Pet =
  mongoose.models.Pet || mongoose.model('Pet', PetSchema, 'pets');

exports.testMongo = async (req, res) => {
  const inicio = Date.now();

  const rows = await Pet.find().limit(10);

  res.json({
    banco: 'mongodb',
    tempo_ms: Date.now() - inicio,
    registros: rows.length
  });
};
