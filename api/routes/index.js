const express = require('express');
const router = express.Router();
const Paintings = require('../models/Painting');

// GET all paintings
router.get('/airdates', async (req, res) => {
  try {
    const paintings = await Paintings.find({});
    res.json(paintings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add more routes later !!!!!
module.exports = router;
