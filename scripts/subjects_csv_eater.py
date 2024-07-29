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

# Read CSV file and collect subject matters
with open('subjects.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    all_subject_matters = set()

    # Process each row in the CSV file
    for row in reader:
        title = row['TITLE'].strip()

        # Insert the title into the painting_title table if not exists
        cur.execute("""
            INSERT INTO painting_title (subject_name)
            VALUES (%s)
            ON CONFLICT (subject_name) DO NOTHING
            RETURNING subject_id
        """, (title,))

        # Get the subject_id of the inserted or existing subject
        subject_id = cur.fetchone()
        if not subject_id:
            cur.execute(
                "SELECT subject_id FROM painting_title WHERE\
                    subject_name = %s",
                (title,))
            subject_id = cur.fetchone()[0]
        else:
            subject_id = subject_id[0]

        # Process subject matters for the current title
        for subject_matter in row.keys():
            if subject_matter != 'TITLE' and row[subject_matter]:
                subject_matter = subject_matter.strip()
                all_subject_matters.add(subject_matter)

                # Insert sub_matter into subject_matters if not exists
                cur.execute("""
                    INSERT INTO subject_matters (subject_matter_name)
                    VALUES (%s)
                    ON CONFLICT (subject_matter_name) DO NOTHING
                    RETURNING subject_matter_id
                """, (subject_matter,))

                # Get the subject_matter_id
                subject_matter_id = cur.fetchone()
                if not subject_matter_id:
                    cur.execute(
                        "SELECT subject_matter_id FROM subject_matters WHERE\
                            subject_matter_name = %s",
                        (subject_matter,))
                    subject_matter_id = cur.fetchone()[0]
                else:
                    subject_matter_id = subject_matter_id[0]

                # Insert the mapping into the subject_title_mapping table
                cur.execute("""
                    INSERT INTO subject_title_mapping (subject_id,\
                            subject_matter_id)
                    VALUES (%s, %s)
                    ON CONFLICT DO NOTHING
                """, (subject_id, subject_matter_id))

    print(f"Collected subject matters: {all_subject_matters}")

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()
