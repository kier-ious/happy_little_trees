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

# Collect subject matters from the CSV header
all_subject_matters = set()

# Read CSV file and collect subject matters
with open('subjects.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    header = reader.fieldnames  # Get the header row

    # Collect subject matters from the header
    for subject_matters in header:
        if subject_matters != 'TITLE':
            subject_matters = subject_matters.strip()
            all_subject_matters.add(subject_matters)

# Insert subject matters into the database if they don't already exist
for subject_matters in all_subject_matters:
    cur.execute("""
        INSERT INTO subject_matters (subject_matter_name)
        VALUES (%s)
        ON CONFLICT (subject_matter_name) DO NOTHING
    """, (subject_matters,))

# Process the CSV file again to map titles to subject matters
with open('subjects.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        title = row['TITLE'].strip()

        # Insert the title into the painting_title table
        cur.execute("""
            INSERT INTO painting_title (subject_name)
            VALUES (%s)
            ON CONFLICT (subject_name) DO NOTHING
            RETURNING subject_id
        """, (title,))

        # Get the title_id of the inserted or existing title
        title_id = cur.fetchone()
        if not title_id:
            cur.execute(
                "SELECT subject_id FROM painting_title\
                    WHERE subject_name = %s",
                (title,))
            title_id = cur.fetchone()[0]
        else:
            title_id = title_id[0]

        # Map the title to subject matters
        for subject_matters in header:
            if subject_matters != 'TITLE' and row[subject_matters]:
                subject_matters = subject_matters.strip()
                # Get the subject_matter_id
                cur.execute(
                    "SELECT subject_matter_id FROM subject_matters\
                        WHERE subject_matter_name = %s",
                    (subject_matters,))
                subject_matter_id = cur.fetchone()[0]

                # Insert the mapping into the subject_title_mapping table
                cur.execute("""
                    INSERT INTO subject_title_mapping\
                            (subject_id, subject_matter_id)
                    VALUES (%s, %s)
                    ON CONFLICT (subject_id, subject_matter_id) DO NOTHING
                """, (title_id, subject_matter_id))

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()
