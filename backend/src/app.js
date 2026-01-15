require('dotenv').config();
const express = require('express');
const connectMongo = require('./config/mongo');

// IMPORTAR O SCHEMA ANTES DE USAR O MODELO
require('./models/pet.schema');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectMongo();
  app.use('/test', require('./routes/test.routes'));

  app.listen(PORT, () => {
    console.log(`vidapet rodando na porta ${PORT}`);
  });
}

startServer();
