CREATE TABLE artists(
    id SERIAL PRIMARY KEY,
    artist_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE artworks(
    id SERIAL PRIMARY KEY,
    file_name TEXT NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tracks(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    artwork INTEGER REFERENCES artworks(id) ON DELETE CASCADE,
    song TEXT NOT NULL,
    duration INTEGER NOT NULL,
    year INT,
    created_at TIMESTAMP DEFAULT NOW(),
    content_type VARCHAR(50) NOT NULL,
    artist INTEGER NOT NULL REFERENCES artists(id) ON DELETE
    SET
        NULL
);

CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
) WITH (OIDS = FALSE);

ALTER TABLE
    "session"
ADD
    CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");