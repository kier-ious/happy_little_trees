require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Define routes
app.get('/airdates', async (req, res) => {
    try {
        const paintings = await Painting.find();
        console.log('Paintings:', paintings);
        res.json(paintings);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

app.get('/paintings/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const painting = await Painting.findById(id);
        if (!painting) {
            return res.status(404).json({ message: 'Painting not found' });
        }
        res.json(painting);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Server error', error });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
