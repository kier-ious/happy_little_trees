require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');
const swaggerJsdoc = require('swagger-jsdoc');
const winston = require('winston');

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Create a write stream for winston to use
logger.stream = {
    write: (message) => logger.info(message.trim())
};

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Winston for request logging
app.use((req, res, next) => {
    logger.info(`HTTP ${req.method} ${req.url}`);
    next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
    logger.info('Connected to MongoDB');
});

db.on('error', (err) => {
    logger.error('Error connecting to MongoDB:', err);
});

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Painting API',
            version: '1.0.0',
            description: 'API for painting data',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            schemas: {
                Painting: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'uuid' },
                        paintingTitle: { type: 'string' },
                        season: { type: 'string' },
                        id: { type: 'string' },
                        paintingIndex: { type: 'string' },
                        imgSrc: { type: 'string' },
                        episode: { type: 'string' },
                        numColors: { type: 'number' },
                        youtubeSrc: { type: 'string' },
                        colors: { type: 'array', items: { type: 'string' } },
                        colorHex: { type: 'array', items: { type: 'string' } },
                        BlackGesso: { type: 'boolean' },
                        BrightRed: { type: 'boolean' },
                        BurntUmber: { type: 'boolean' },
                        CadmiumYellow: { type: 'boolean' },
                        DarkSienna: { type: 'boolean' },
                        IndianRed: { type: 'boolean' },
                        IndianYellow: { type: 'boolean' },
                        LiquidBlack: { type: 'boolean' },
                        LiquidClear: { type: 'boolean' },
                        MidnightBlack: { type: 'boolean' },
                        PhthaloBlue: { type: 'boolean' },
                        PhthaloGreen: { type: 'boolean' },
                        PrussianBlue: { type: 'boolean' },
                        SapGreen: { type: 'boolean' },
                        TitaniumWhite: { type: 'boolean' },
                        VanDykeBrown: { type: 'boolean' },
                        YellowOchre: { type: 'boolean' },
                        AlizarinCrimson: { type: 'boolean' },
                        EPISODE: { type: 'string' },
                        TITLE: { type: 'string' },
                        APPLE_FRAME: { type: 'boolean' },
                        AURORA_BOREALIS: { type: 'boolean' },
                        BARN: { type: 'boolean' },
                        BEACH: { type: 'boolean' },
                        BOAT: { type: 'boolean' },
                        BRIDGE: { type: 'boolean' },
                        BUILDING: { type: 'boolean' },
                        BUSHES: { type: 'boolean' },
                        CABIN: { type: 'boolean' },
                        CACTUS: { type: 'boolean' },
                        CIRCLE_FRAME: { type: 'boolean' },
                        CIRRUS: { type: 'boolean' },
                        CLIFF: { type: 'boolean' },
                        CLOUDS: { type: 'boolean' },
                        CONIFER: { type: 'boolean' },
                        CUMULUS: { type: 'boolean' },
                        DECIDUOUS: { type: 'boolean' },
                        DIANE_ANDRE: { type: 'boolean' },
                        DOCK: { type: 'boolean' },
                        DOUBLE_OVAL_FRAME: { type: 'boolean' },
                        FARM: { type: 'boolean' },
                        FENCE: { type: 'boolean' },
                        FIRE: { type: 'boolean' },
                        FLORIDA_FRAME: { type: 'boolean' },
                        FLOWERS: { type: 'boolean' },
                        FOG: { type: 'boolean' },
                        FRAMED: { type: 'boolean' },
                        GRASS: { type: 'boolean' },
                        GUEST: { type: 'boolean' },
                        HALF_CIRCLE_FRAME: { type: 'boolean' },
                        HALF_OVAL_FRAME: { type: 'boolean' },
                        HILLS: { type: 'boolean' },
                        LAKE: { type: 'boolean' },
                        LAKES: { type: 'boolean' },
                        LIGHTHOUSE: { type: 'boolean' },
                        MILL: { type: 'boolean' },
                        MOON: { type: 'boolean' },
                        MOUNTAIN: { type: 'boolean' },
                        MOUNTAINS: { type: 'boolean' },
                        NIGHT: { type: 'boolean' },
                        OCEAN: { type: 'boolean' },
                        OVAL_FRAME: { type: 'boolean' },
                        PALM_TREES: { type: 'boolean' },
                        PATH: { type: 'boolean' },
                        PERSON: { type: 'boolean' },
                        PORTRAIT: { type: 'boolean' },
                        RECTANGLE_3D_FRAME: { type: 'boolean' },
                        RECTANGULAR_FRAME: { type: 'boolean' },
                        RIVER: { type: 'boolean' },
                        ROCKS: { type: 'boolean' },
                        SEASHELL_FRAME: { type: 'boolean' },
                        SNOW: { type: 'boolean' },
                        SNOWY_MOUNTAIN: { type: 'boolean' },
                        SPLIT_FRAME: { type: 'boolean' },
                        STEVE_ROSS: { type: 'boolean' },
                        STRUCTURE: { type: 'boolean' },
                        SUN: { type: 'boolean' },
                        TOMB_FRAME: { type: 'boolean' },
                        TREE: { type: 'boolean' },
                        TREES: { type: 'boolean' },
                        TRIPLE_FRAME: { type: 'boolean' },
                        WATERFALL: { type: 'boolean' },
                        WAVES: { type: 'boolean' },
                        WINDMILL: { type: 'boolean' },
                        WINDOW_FRAME: { type: 'boolean' },
                        WINTER: { type: 'boolean' },
                        WOOD_FRAMED: { type: 'boolean' },
                        episodeTitle: { type: 'string' },
                        month: { type: 'string' },
                        day: { type: 'number' },
                        year: { type: 'number' },
                    },
                },
            },
        },
    },
    apis: ['./server.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serving Swagger docs as JSON
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(swaggerDocs);
});

// Define routes

/**
 * @openapi
 * /airdates:
 *   get:
 *     summary: Get all paintings
 *     description: Retrieve a list of all paintings available in the database. This endpoint returns an array of painting objects.
 *     responses:
 *       200:
 *         description: A list of paintings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Painting'
 *       500:
 *         description: Server error occurred while fetching data.
 */
app.get('/airdates', async (req, res) => {
    try {
        const paintings = await Painting.find({});
        logger.info('Fetched all paintings');
        res.json(paintings);
    } catch (error) {
        logger.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

/**
 * @openapi
 * /paintings/{id}:
 *   get:
 *     summary: Get a painting by ID
 *     description: Retrieve a specific painting by its ID. This endpoint returns a single painting object.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the painting to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A painting object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Painting'
 *       404:
 *         description: Painting not found.
 *       500:
 *         description: Server error occurred while fetching data.
 */
app.get('/paintings/:id', async (req, res) => {
    try {
        const painting = await Painting.findById(req.params.id);
        if (!painting) {
            return res.status(404).json({ message: 'Painting not found' });
        }
        logger.info(`Fetched painting with ID: ${req.params.id}`);
        res.json(painting);
    } catch (error) {
        logger.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;
