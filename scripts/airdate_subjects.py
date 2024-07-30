import csv
import psycopg2


def populate_airdate_subjects(airdate_txt, subjects_txt, db_config):
    try:
        conn = psycopg2.connect(**db_config)
        cur = conn.cursor()

        # Process 'subjects.txt' for efficient access
        painting_subjects = {}
        with open(subjects_txt, 'r') as file:
            reader = csv.reader(file, delimiter=',')
            header = next(reader)  # Skip the header line

            for row in reader:
                title = row[0].strip().strip('"')  # Title column
                subjects = [subject.strip().strip('"') for subject in row[1:] if subject.strip()]
                painting_subjects[title] = subjects

        # Get mapping of painting titles to IDs from airdate table
        painting_title_map = {}
        cur.execute("SELECT painting_title, episode_id FROM airdate")
        for row in cur.fetchall():
            painting_title_map[row[0]] = row[1]

        # Get mapping of subject names to IDs from subject_matters table
        subject_name_map = {}
        cur.execute("SELECT subject_matter_name, subject_matter_id FROM subject_matters")
        for row in cur.fetchall():
            subject_name_map[row[0]] = row[1]

        # Process airdate data and insert into airdate_subjects
        for painting_title, subjects in painting_subjects.items():
            episode_id = painting_title_map.get(painting_title)
            if episode_id:
                for subject in subjects:
                    subject_id = subject_name_map.get(subject)
                    if subject_id:
                        cur.execute(
                            "INSERT INTO airdate_subjects (episode_id, subject_id) VALUES (%s, %s) "
                            "ON CONFLICT (episode_id, subject_id) DO NOTHING",
                            (episode_id, subject_id)
                        )
                    else:
                        print(f"Subject '{subject}' not found in subject_matters table")
            else:
                print(f"Painting title '{painting_title}' not found in airdate table")

        conn.commit()
    except (FileNotFoundError, psycopg2.OperationalError) as e:
        print(f"Error: {e}")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# Example database configuration
db_config = {
    "host": "localhost",
    "database": "joys_of_coding",
    "user": "kiermcalister",
    "password": "root"
}

# Define file paths
airdate_txt = "data/airdate.txt"
subjects_txt = "data/subjects.txt"

# Call the function to populate the airdate_subjects table
populate_airdate_subjects(airdate_txt, subjects_txt, db_config)
