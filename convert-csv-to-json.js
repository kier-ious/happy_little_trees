const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, 'combined_data.csv');
const jsonFilePath = path.join(__dirname, 'combined_data.json');

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2), 'utf-8');
    console.log('CSV to JSON conversion complete.');
  });
