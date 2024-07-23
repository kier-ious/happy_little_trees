CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL
);

CREATE TABLE episodes (
    episode_id SERIAL PRIMARY KEY,
    painting_index INT,
    img_src VARCHAR(255),
    painting_title VARCHAR(255),
    season INT,
    episode_number INT,
    num_colors INT,
    youtube_src VARCHAR(255),
    original_broadcast_date DATE
);

CREATE TABLE colors (
    color_id SERIAL PRIMARY KEY,
    color_name VARCHAR(255),
    color_hex VARCHAR(7)
);

CREATE TABLE episode_subjects (
    episode_id INT REFERENCES episodes(episode_id),
    subject_id INT REFERENCES subjects(subject_id),
    PRIMARY KEY (episode_id, subject_id)
);

CREATE TABLE episode_colors (
    episode_id INT REFERENCES episodes(episode_id),
    color_id INT REFERENCES colors(color_id),
    PRIMARY KEY (episode_id, color_id)
);
