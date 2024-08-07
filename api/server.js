require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
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
                        painting_title: { type: 'string' },
                        season: { type: 'string' },
                        id: { type: 'string' },
                        painting_index: { type: 'string' },
                        img_src: { type: 'string' },
                        episode: { type: 'string' },
                        num_colors: { type: 'string' },
                        youtube_src: { type: 'string' },
                        colors: { type: 'array', items: { type: 'string' } },
                        color_hex: { type: 'array', items: { type: 'string' } },
                        Black_Gesso: { type: 'string' },
                        Bright_Red: { type: 'string' },
                        Burnt_Umber: { type: 'string' },
                        Cadmium_Yellow: { type: 'string' },
                        Dark_Sienna: { type: 'string' },
                        Indian_Red: { type: 'string' },
                        Indian_Yellow: { type: 'string' },
                        Liquid_Black: { type: 'string' },
                        Liquid_Clear: { type: 'string' },
                        Midnight_Black: { type: 'string' },
                        Phthalo_Blue: { type: 'string' },
                        Phthalo_Green: { type: 'string' },
                        Prussian_Blue: { type: 'string' },
                        Sap_Green: { type: 'string' },
                        Titanium_White: { type: 'string' },
                        Van_Dyke_Brown: { type: 'string' },
                        Yellow_Ochre: { type: 'string' },
                        Alizarin_Crimson: { type: 'string' },
                        EPISODE: { type: 'string' },
                        TITLE: { type: 'string' },
                        APPLE_FRAME: { type: 'string' },
                        AURORA_BOREALIS: { type: 'string' },
                        BARN: { type: 'string' },
                        BEACH: { type: 'string' },
                        BOAT: { type: 'string' },
                        BRIDGE: { type: 'string' },
                        BUILDING: { type: 'string' },
                        BUSHES: { type: 'string' },
                        CABIN: { type: 'string' },
                        CACTUS: { type: 'string' },
                        CIRCLE_FRAME: { type: 'string' },
                        CIRRUS: { type: 'string' },
                        CLIFF: { type: 'string' },
                        CLOUDS: { type: 'string' },
                        CONIFER: { type: 'string' },
                        CUMULUS: { type: 'string' },
                        DECIDUOUS: { type: 'string' },
                        DIANE_ANDRE: { type: 'string' },
                        DOCK: { type: 'string' },
                        DOUBLE_OVAL_FRAME: { type: 'string' },
                        FARM: { type: 'string' },
                        FENCE: { type: 'string' },
                        FIRE: { type: 'string' },
                        FLORIDA_FRAME: { type: 'string' },
                        FLOWERS: { type: 'string' },
                        FOG: { type: 'string' },
                        FRAMED: { type: 'string' },
                        GRASS: { type: 'string' },
                        GUEST: { type: 'string' },
                        HALF_CIRCLE_FRAME: { type: 'string' },
                        HALF_OVAL_FRAME: { type: 'string' },
                        HILLS: { type: 'string' },
                        LAKE: { type: 'string' },
                        LAKES: { type: 'string' },
                        LIGHTHOUSE: { type: 'string' },
                        MILL: { type: 'string' },
                        MOON: { type: 'string' },
                        MOUNTAIN: { type: 'string' },
                        MOUNTAINS: { type: 'string' },
                        NIGHT: { type: 'string' },
                        OCEAN: { type: 'string' },
                        OVAL_FRAME: { type: 'string' },
                        PALM_TREES: { type: 'string' },
                        PATH: { type: 'string' },
                        PERSON: { type: 'string' },
                        PORTRAIT: { type: 'string' },
                        RECTANGLE_3D_FRAME: { type: 'string' },
                        RECTANGULAR_FRAME: { type: 'string' },
                        RIVER: { type: 'string' },
                        ROCKS: { type: 'string' },
                        SEASHELL_FRAME: { type: 'string' },
                        SNOW: { type: 'string' },
                        SNOWY_MOUNTAIN: { type: 'string' },
                        SPLIT_FRAME: { type: 'string' },
                        STEVE_ROSS: { type: 'string' },
                        STRUCTURE: { type: 'string' },
                        SUN: { type: 'string' },
                        TOMB_FRAME: { type: 'string' },
                        TREE: { type: 'string' },
                        TREES: { type: 'string' },
                        TRIPLE_FRAME: { type: 'string' },
                        WATERFALL: { type: 'string' },
                        WAVES: { type: 'string' },
                        WINDMILL: { type: 'string' },
                        WINDOW_FRAME: { type: 'string' },
                        WINTER: { type: 'string' },
                        WOOD_FRAMED: { type: 'string' },
                        Episode_TITLE: { type: 'string' },
                        Month: { type: 'string' },
                        Day: { type: 'string' },
                        Year: { type: 'string' },
                    },
                },
            },
        },
    },
    apis: ['./server.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
        const paintings = await Painting.find();
        logger.info('Fetched paintings');
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
 *     description: Retrieve a single painting by its ID. If the painting is not found, a 404 error is returned. Ensure the ID is valid and correctly formatted.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the painting to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The painting details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Painting'
 *       404:
 *         description: Painting not found. The ID provided does not match any painting in the database.
 *       400:
 *         description: Invalid ID format. The provided ID does not conform to expected format.
 *       500:
 *         description: Server error occurred while fetching the painting.
 */
app.get('/paintings/:id', async (req, res) => {
    try {
        const painting = await Painting.findById(req.params.id);
        if (!painting) {
            res.status(404).json({ message: 'Painting not found' });
        } else {
            res.json(painting);
        }
    } catch (error) {
        logger.error('Error fetching painting:', error.message);
        res.status(500).json({ message: 'Error fetching painting', error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
