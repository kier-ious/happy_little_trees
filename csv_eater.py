import csv
import psycopg2
from datetime import datetime

# Database connection parameters
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'joys_of_coding'
DB_USER = 'kier'
DB_PASS = 'root'

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host=DB_HOST,
    port=DB_PORT,
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS
)
cur = conn.cursor()

# Read CSV file and insert data into the database
with open('airdate.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        print(row)  # Print each row to verify correct data
        date_str = row['Date'].strip()  # Strip any extra spaces

        # Add default year if missing
        if ',' not in date_str:
            date_str += ', 1983'

        # Convert the date to the correct format
        try:
            date_obj = datetime.strptime(date_str, '%B %d, %Y').date()
        except ValueError as e:
            print(f"Date parsing error for '{date_str}': {e}")
            continue

        # Insert data into the database
        try:
            cur.execute("""
            INSERT INTO airdate (painting_title, original_broadcast_date)
            VALUES (%s, %s)
            """, (row['Title'], date_obj))
        except psycopg2.Error as e:
            print(f"Database insertion error: {e}")
            continue

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()
