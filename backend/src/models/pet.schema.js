const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: Number,
  especie: String
});

mongoose.model('Pet', PetSchema);
