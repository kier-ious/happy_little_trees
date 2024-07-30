import psycopg2
import csv


def populate_airdate_colors(airdate_csv, colors_used_csv, db_config):
    try:
        conn = psycopg2.connect(**db_config)
        cur = conn.cursor()

        # Process colors data for efficient access
        painting_colors = {}
        with open(colors_used_csv, 'r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip header
            for row in reader:
                painting_title = row[3].strip('"')
                color_names_string = row[8].strip("[]").replace("'", "").replace("\r\n", "")
                color_names = [color.strip() for color in color_names_string.split(",")]
                painting_colors[painting_title] = color_names

        # Get mapping of painting titles to IDs
        painting_title_map = {}
        cur.execute("SELECT subject_id, subject_name FROM painting_title")
        for row in cur.fetchall():
            painting_title_map[row[1]] = row[0]

        # Process airdate data and insert into airdate_colors
        with open(airdate_csv, 'r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip header
            for row in reader:
                painting_title = row[1].strip('"')
                if painting_title in painting_colors:
                    painting_title_id = painting_title_map.get(painting_title)
                    if painting_title_id:
                        for color_name in painting_colors[painting_title]:
                            color_name = color_name.strip()  # Remove extra spaces
                            color_id = get_color_id(color_name, cur)
                            if color_id:
                                cur.execute(
                                    "INSERT INTO airdate_colors (painting_title_id, color_id) VALUES (%s, %s)",
                                    (painting_title_id, color_id)
                                )
                            else:
                                print(f"Color '{color_name}' not found for painting '{painting_title}'")
                    else:
                        print(f"Painting title '{painting_title}' not found in painting_title table")

        conn.commit()
    except (FileNotFoundError, psycopg2.OperationalError) as e:
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()


def get_color_id(color_name, cur):
    # Convert color_name to lowercase for case-insensitive comparison
    color_name = color_name.lower()
    cur.execute(
        "SELECT color_id FROM colors WHERE LOWER(color_name) = %s", (color_name,))
    result = cur.fetchone()
    return result[0] if result else None


# Example database configuration
db_config = {
    "host": "localhost",
    "database": "joys_of_coding",
    "user": "kiermcalister",
    "password": "root"
}

airdate_csv = "data/airdate.csv"
colors_used_csv = "data/colors_used.csv"

populate_airdate_colors(airdate_csv, colors_used_csv, db_config)
