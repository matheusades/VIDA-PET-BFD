const mongoose = require('mongoose');

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongo conectado');
  } catch (err) {
    console.error('erro mongo:', err);
    process.exit(1);
  }
}

module.exports = connectMongo;
