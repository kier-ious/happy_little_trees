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

// Route to fetch subject matters
app.get('/subject_matters', async (req, res) => {
  const subjectName = req.query.subject_name;

  let query = 'SELECT * FROM subject_matters';
  let values = [];

  if (subjectName) {
    query += ' WHERE subject_matter_name = $1';
    values.push(subjectName);
  }

  try {
    const rows = await executeQuery(query, values);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch colors
app.get('/colors', async (req, res) => {
  const colorName = req.query.color_name;

  let query = 'SELECT * FROM colors';
  let values = [];

  if (colorName) {
    query += ' WHERE color_name = $1';
    values.push(colorName);
  }

  try {
    const rows = await executeQuery(query, values);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch airdate_subjects
app.get('/airdate_subjects', async (req, res) => {
  const episodeId = req.query.episode_id;
  const subjectName = req.query.subject_name;

  let query = "SELECT * FROM airdate_subjects "+
              "JOIN airdate "+
              "ON airdate_subjects.episode_id = airdate.episode_id "+
              "JOIN subject_matters "+
              "ON airdate_subjects.subject_id = subject_matters.subject_matter_id "+
              "WHERE subject_matter_name LIKE '%" + subjectName + '%\'';
  let values = [];
  values.push(subjectName)
  let conditions = [];

  // if (episodeId) {
  //   conditions.push('episode_id = $' + (conditions.length + 1));
  //   values.push(episodeId);
  // }

  // if (subjectId) {
  //   conditions.push('subject_id = $' + (conditions.length + 1));
  //   values.push(subjectId);
  // }

  // if (conditions.length > 0) {
  //   query += ' WHERE ' + conditions.join(' AND ');
  // }

  try {
    const rows = await executeQuery(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch airdate_colors
app.get('/airdate_colors', async (req, res) => {
  const episodeId = req.query.episode_id;
  const colorId = req.query.color_id;

  let query = `
    SELECT ac.episode_id, ac.color_id, a.painting_title, c.color_name
    FROM airdate_colors ac
    INNER JOIN airdate a ON ac.episode_id = a.episode_id
    INNER JOIN colors c ON ac.color_id = c.color_id
  `;
  let values = [];
  let conditions = [];

  if (episodeId) {
    conditions.push('ac.episode_id = $' + (conditions.length + 1));
    values.push(episodeId);
  }

  if (colorId) {
    conditions.push('ac.color_id = $' + (conditions.length + 1));
    values.push(colorId);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  try {
    const rows = await executeQuery(query, values);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch subject_colors
app.get('/subject_colors', async (req, res) => {
  const subjectId = req.query.subject_id;
  const colorId = req.query.color_id;

  let query = 'SELECT * FROM subject_colors';
  let values = [];
  let conditions = [];

  if (subjectId) {
    conditions.push('subject_id = $' + (conditions.length + 1));
    values.push(subjectId);
  }

  if (colorId) {
    conditions.push('color_id = $' + (conditions.length + 1));
    values.push(colorId);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
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
