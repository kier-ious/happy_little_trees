import csv
import psycopg2
from datetime import datetime

# Database connection parameters
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'joys_of_coding'
DB_USER = 'kiermcalister'
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
        # Print each row to verify correct data
        print(f"Processing row: {row}")

        date_str = row['Date'].strip()  # Date is now in MM-DD-YYYY format

        # Convert the date to the correct format
        try:
            date_obj = datetime.strptime(date_str, '%m-%d-%Y').date()
            print(f"Parsed date: {date_obj}")  # Debugging date parsing
        except ValueError as e:
            print(f"Date parsing error for '{date_str}': {e}")
            continue

        # Insert data into the database
        try:
            cur.execute("""
            INSERT INTO airdate (painting_title, original_broadcast_date)
            VALUES (%s, %s)
            """, (row['Title'], date_obj))
            print(f"Inserted row: {row['Title']}, {date_obj}")  # Debug insert
        except psycopg2.Error as e:
            print(
                f"Database insertion error for '{row['Title']}':\
                    {e.pgcode} - {e.pgerror}")
            conn.rollback()  # Rollback the transaction on error
            continue

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()
