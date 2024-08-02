// var express = require('express');
// var app = express();
// // Your middlewares and routes

// module.exports = app;


const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const pool = new Pool({
    user: 'kiermcalister',
    host: 'localhost',
    database: 'joys_of_coding',
    password: 'root',
    port: 5432,
});

// Helper function to execute queries
const executeQuery = async (query, values) => {
    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};

// Route to fetch airdate data
app.get('/airdate', async (req, res) => {
    const month = req.query.month;

    let query = 'SELECT * FROM airdate';
    let values = [];

    if (month) {
        query += ' WHERE EXTRACT(MONTH FROM original_broadcast_date) = $1';
        values.push(month);
    }

    try {
        const rows = await executeQuery(query, values);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
