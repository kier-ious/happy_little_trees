import csv
import psycopg2


def populate_airdate_colors(airdate_txt, colors_used_txt, db_config):
    try:
        conn = psycopg2.connect(**db_config)
        cur = conn.cursor()

        with open(colors_used_txt, 'r') as colors_file:
            reader = list(csv.DictReader(colors_file, delimiter=','))
            print(reader[0]['id'])
            for row in reader:
                print(row['id'], row['colors'])
                cur.execute(
                    'INSERT INTO episode_colors (episode_id, colors)'
                    + ' VALUES (%s,%s)', (row['id'], str(row['colors']))
                )

        conn.commit()
    except (FileNotFoundError, psycopg2.OperationalError) as e:
        print(f"Error: {e}")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


db_config = {
    "host": "localhost",
    "database": "joys_of_coding",
    "user": "kiermcalister",
    "password": "root"
}

airdate_txt = "data/airdate.txt"
colors_used_txt = "data/colors_used.txt"

populate_airdate_colors(airdate_txt, colors_used_txt, db_config)
