# Joys of Coding

## Project Overview

The "Joys of Coding" project aims to explore the ETL (Extract, Transform, Load) process by designing and building a database to house collected data about "The Joy of Painting" episodes. The project also involves creating an API to filter this data based on broadcast month, subject matter, and color palette.

## Project Structure

├── data
│ ├── episodes.csv
│ ├── colors.csv
│ └── subjects.csv
├── scripts
│ ├── extract.py
│ ├── transform.py
│ └── load.py
├── api
│ ├── app.js
│ └── routes.js
├── README.md
└── requirements.txt


## Prerequisites

- Python 3.x
- Node.js
- PostgreSQL (or any other SQL database)
- Tomat AI (for CSV data cleanup)
- Required Python packages (listed in `requirements.txt`)

## Setup Instructions

### 1. Setup Database

1. Install PostgreSQL or your preferred SQL database.
2. Create a new database for the project.
3. Run the SQL scripts located in the `scripts` folder to set up the database schema.

### 2. Install Dependencies

- **Python Packages:**
  ```bash
  pip install -r requirements.txt

### API Endpoints
- GET /episodes
- Retrieve a list of all episodes.
- GET /episodes/filter
- Filter episodes based on:
1. month: Month of original broadcast
2. subject: Subject matter
3. color: Color palette

Contributor:
## Kier McAlister
