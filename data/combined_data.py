import csv

# File paths
airdate_file = '/Users/kiermcalister/Desktop/This is Lokal/happy_little_trees/data/airdate.txt'
colors_file = '/Users/kiermcalister/Desktop/This is Lokal/happy_little_trees/data/colors_used.txt'
subjects_file = '/Users/kiermcalister/Desktop/This is Lokal/happy_little_trees/data/subject_matter.txt'
output_file = '/Users/kiermcalister/Desktop/This is Lokal/happy_little_trees/data/combined_data.csv'

# Read airdate data
airdate_data = {}
with open(airdate_file, 'r') as f:
    reader = csv.reader(f)
    header = next(reader)  # Skip header
    print(f"Airdate header: {header}")
    for row in reader:
        if len(row) < 9:
            print(f"Skipping invalid airdate row: {row}")
            continue
        try:
            painting_title = row[3].strip().upper()
            original_broadcast_date = row[8]
            airdate_data[painting_title] = original_broadcast_date
        except IndexError:
            print(f"IndexError with row: {row}")

print(f"Airdate data: {list(airdate_data.items())[:5]}")  # Print first 5 entries for debugging

# Read colors data
colors_data = {}
with open(colors_file, 'r') as f:
    reader = csv.reader(f)
    header = next(reader)  # Skip header
    print(f"Colors header: {header}")
    for row in reader:
        if len(row) < 28:  # Ensure there are enough columns
            print(f"Skipping invalid colors row: {row}")
            continue
        try:
            painting_title = row[3].strip().upper()
            colors_list = row[8]
            color_names = header[9:]  # Skip the first 9 columns
            colors = dict(zip(color_names, colors_list.strip("[]").replace("'", "").split(", ")))
            colors_data[painting_title] = colors
        except IndexError:
            print(f"IndexError with row: {row}")

print(f"Colors data: {list(colors_data.items())[:5]}")  # Print first 5 entries for debugging

# Read subjects data
subject_matter = {}
with open(subjects_file, 'r') as f:
    reader = csv.reader(f)
    header = next(reader)  # Skip header
    print(f"Subjects header: {header}")
    for row in reader:
        if len(row) < 68:  # Ensure there are enough columns
            print(f"Skipping invalid subjects row: {row}")
            continue
        try:
            painting_title = row[0].strip().upper()
            subjects = row[1:]
            subject_matter[painting_title] = subjects
        except IndexError:
            print(f"IndexError with row: {row}")

print(f"Subject matter data: {list(subject_matter.items())[:5]}")  # Print first 5 entries for debugging

# Combine data
combined_data = []
for title in airdate_data:
    date = airdate_data.get(title, 'N/A')
    colors = colors_data.get(title, {})
    subjects = subject_matter.get(title, [])

    # Combine color data into a single string
    colors_combined = ', '.join(f"{color}: {value}" for color, value in colors.items())

    # Combine the row
    combined_row = [title, date, colors_combined] + subjects
    combined_data.append(combined_row)

# Write combined data to output file
with open(output_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f, delimiter='\t')
    # Write headers
    writer.writerow(["Title", "Date"] + header[9:] + ["Subjects"])
    # Write data rows
    for row in combined_data:
        writer.writerow(row)

print("Data combined successfully!")
