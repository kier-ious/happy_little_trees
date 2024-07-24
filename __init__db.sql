-- Drop existing tables if they exist
DROP TABLE IF EXISTS painting_title;
DROP TABLE IF EXISTS airdate_subjects;
DROP TABLE IF EXISTS airdate_colors;
DROP TABLE IF EXISTS subject_title_mapping;
DROP TABLE IF EXISTS subject_matters;

-- Create new tables
CREATE TABLE subject_matters (
    subject_matter_id SERIAL PRIMARY KEY,
    subject_matter_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE airdate_subjects (
    episode_id INT REFERENCES airdate(episode_id),
    subject_id INT REFERENCES subject_matters(subject_matter_id),
    PRIMARY KEY (episode_id, subject_id)
);

CREATE TABLE airdate_colors (
    episode_id INT REFERENCES airdate(episode_id),
    color_id INT REFERENCES colors(color_id),
    PRIMARY KEY (episode_id, color_id)
);

CREATE TABLE subject_title_mapping (
    subject_id INT REFERENCES painting_title(subject_id),
    subject_matter_id INT REFERENCES subject_matters(subject_matter_id),
    PRIMARY KEY (subject_id, subject_matter_id)
);
