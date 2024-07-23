-- Drop existing tables if they exist
DROP TABLE IF EXISTS airdate_subjects;
DROP TABLE IF EXISTS airdate_colors;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS subject_title_mapping;
DROP TABLE IF EXISTS subject_matters;

-- Recreate the tables
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL
);

-- CREATE TABLE airdate (
--     airdate_id SERIAL PRIMARY KEY,
--     painting_index INT,
--     img_src VARCHAR(255),
--     painting_title VARCHAR(255),
--     season INT,
--     episode_number INT,
--     num_colors INT,
--     youtube_src VARCHAR(255),
--     original_broadcast_date DATE
-- );

-- CREATE TABLE colors (
--     color_id SERIAL PRIMARY KEY,
--     color_name VARCHAR(255),
--     color_hex VARCHAR(7)
-- );

CREATE TABLE airdate_subjects (
    airdate_id INT REFERENCES airdate(airdate_id),
    subject_id INT REFERENCES subjects(subject_id),
    PRIMARY KEY (airdate_id, subject_id)
);

CREATE TABLE airdate_colors (
    airdate_id INT REFERENCES airdate(airdate_id),
    color_id INT REFERENCES colors(color_id),
    PRIMARY KEY (airdate_id, color_id)
);

-- Create the subject_matters table
CREATE TABLE subject_matters (
    subject_matter_id SERIAL PRIMARY KEY,
    subject_matter_name VARCHAR(255) NOT NULL UNIQUE
);

-- Junction table for linking subjects and subject matters
CREATE TABLE subject_title_mapping (
    subject_id INT REFERENCES subjects(subject_id),
    subject_matter_id INT REFERENCES subject_matters(subject_matter_id),
    PRIMARY KEY (subject_id, subject_matter_id)
);
