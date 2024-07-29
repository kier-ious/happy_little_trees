import psycopg2
import csv


def insert_colors(data_file, db_config):
    try:
        conn = psycopg2.connect(**db_config)
        cur = conn.cursor()

        with open(data_file, 'r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip header

            for row in reader:
                colors_string = row[8].strip("[]").replace("'", "")
                colors = colors_string.split(", ")

                for color in colors:
                    color = color.strip()
                    cur.execute(
                        "SELECT color_id FROM colors WHERE color_name = %s",
                        (color,))
                    result = cur.fetchone()
                    if not result:
                        cur.execute(
                            "INSERT INTO colors (color_name) VALUES (%s)",
                            (color,))

        conn.commit()
    except (FileNotFoundError, psycopg2.OperationalError) as e:
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()


db_config = {
    "host": "localhost",
    "database": "joys_of_coding",
    "user": "kiermcalister",
    "password": "root"
}

insert_colors("data/colors_used.csv", db_config)
