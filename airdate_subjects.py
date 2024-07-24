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

# Process 'airdate.csv'
with open('airdate.csv', 'r') as airdate_file:
    reader = csv.DictReader(airdate_file)

    for row in reader:
        title = row['TITLE'].strip()
        date = row['DATE'].strip()

        # Fetch episode_id from airdate table
        cur.execute("""
            SELECT episode_id FROM airdate
            WHERE painting_title = %s AND original_broadcast_date = %s
        """, (title, date))
        episode_id = cur.fetchone()

        if episode_id:
            episode_id = episode_id[0]

            # Process subject matters for the current episode
            with open('subjects.csv', 'r') as subjects_file:
                subjects_reader = csv.DictReader(subjects_file)

                for subjects_row in subjects_reader:
                    subject_matter_name = subjects_row['TITLE'].strip()

                    if subject_matter_name == title:  # match current ep title
                        for subject_matter in subjects_row.keys():
                            if subject_matter != 'TITLE' and\
                                    subjects_row[subject_matter]:
                                subject_matter = subject_matter.strip()

                                # Subject_matter_id from subject_matters table
                                cur.execute("""
                                    SELECT subject_matter_id
                                    FROM subject_matters
                                    WHERE subject_matter_name = %s
                                """, (subject_matter,))
                                subject_matter_id = cur.fetchone()

                                if subject_matter_id:
                                    subject_matter_id = subject_matter_id[0]

                                    # Insert into the junction table
                                    cur.execute("""
                                        INSERT INTO airdate_subjects
                                        (episode_id, subject_matter_id)
                                        VALUES (%s, %s)
                                        ON CONFLICT\
                                                (episode_id, subject_matter_id)
                                        DO NOTHING
                                    """, (episode_id, subject_matter_id))
                                else:
                                    print(f"Subject matter '{subject_matter}'\
                                        not found in the\
                                        subject_matters table.")
        else:
            print(f"Episode with title '{title}' and\
                date '{date}' not found in the airdate table.")

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()

print("Data inserted successfully.")
