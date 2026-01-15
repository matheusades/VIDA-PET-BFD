const mongoose = require('mongoose');

// Pega o modelo que foi registrado no schema
const Pet = mongoose.model('Pet');

async function listarPets() {
  return await Pet.find();
}

module.exports = { listarPets };
