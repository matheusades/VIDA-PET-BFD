const express = require('express');
const router = express.Router();

const { listarPets } = require('../models/pet.mariadb');  // MariaDB
const PetMongo = require('../models/pet.mongo');          // MongoDB

// Endpoint MariaDB
router.get('/maria/pets', async (req, res) => {
  try {
    const inicio = Date.now();

    const pets = await listarPets();

    const fim = Date.now();

    res.json({
      banco: 'maria',
      tempo_ms: fim - inicio,
      total: pets.length
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Endpoint MongoDB
router.get('/mongo/pets', async (req, res) => {
  try {
    const inicio = Date.now();

    const pets = await PetMongo.listarPets();

    const fim = Date.now();

    res.json({
      banco: 'mongo',
      tempo_ms: fim - inicio,
      total: pets.length
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
