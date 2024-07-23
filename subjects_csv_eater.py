import csv
import psycopg2

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
with open('subjects.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        title = row['TITLE'].strip().strip('"').upper()  # Clean up title
        subjects = [subj.upper() for subj in row if subj != 'TITLE' and subj]

        # Insert title if it doesn't exist
        cur.execute("""
            INSERT INTO subjects (title)
            VALUES (%s)
            ON CONFLICT (title) DO NOTHING
            RETURNING subject_id
        """, (title,))
        result = cur.fetchone()
        subject_id = result[0]

        for subject in subjects:
            # Insert subject matter if it doesn't exist
            cur.execute("""
                INSERT INTO subject_matters (subject_matter)
                VALUES (%s)
                ON CONFLICT (subject_matter) DO NOTHING
                RETURNING subject_matter_id
            """, (subject,))
            result = cur.fetchone()
            subject_matter_id = result[0]

            # Link title and subject matter
            cur.execute("""
                INSERT INTO subject_title_mapping
                        (subject_id, subject_matter_id)
                VALUES (%s, %s)
                ON CONFLICT DO NOTHING
            """, (subject_id, subject_matter_id))

        print(f"Inserted row: {title}")

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()
