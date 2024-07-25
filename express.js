const express = require('express');
const { Pool } = require('pg');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: 'kiermcalister',
  host: 'localhost',
  database: 'joys_of_coding',
  password: 'root',
  port: 5432,
});

// Route to fetch airdate data
app.get('/airdate', (req, res) => {
  const month = req.query.month; 

  let query = 'SELECT * FROM airdate';
  let values = [];

  if (month) {
    query += ' WHERE EXTRACT(MONTH FROM original_broadcast_date) = $1';
    values.push(month);
  }

  pool.query(query, values, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results.rows);
    }
  });
});

// Route to fetch subject matters
app.get('/subject_matters', (req, res) => {
  const subjectName = req.query.subject_name;

  let query = 'SELECT * FROM subject_matters';
  let values = [];

  if (subjectName) {
    query += ' WHERE subject_matter_name = $1';
    values.push(subjectName);
  }

  pool.query(query, values, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results.rows);
    }
  });
});

app.get('/colors', (req, res) => {
  pool.query('SELECT * FROM colors', (error, results) => {
    if (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results.rows);
    }
  });
});

// Route to fetch colors
app.get('/colors', (req, res) => {
  const colorName = req.query.color_name;

  let query = 'SELECT * FROM colors';
  let values = [];

  if (colorName) {
    query += ' WHERE color_name = $1';
    values.push(colorName);
  }

  pool.query(query, values, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results.rows);
    }
  });
});

// Route to fetch airdate_subjects with query parameters
app.get('/airdate_subjects', (req, res) => {
  const episodeId = req.query.episode_id;
  const subjectId = req.query.subject_id;

  let query = 'SELECT * FROM airdate_subjects';
  let values = [];
  let conditions = [];

  if (episodeId) {
    conditions.push('episode_id = $' + (conditions.length + 1));
    values.push(episodeId);
  }

  if (subjectId) {
    conditions.push('subject_id = $' + (conditions.length + 1));
    values.push(subjectId);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
