CREATE DATABASE photo_portfolio;

CREATE TABLE images(
    images_id SERIAL PRIMARY KEY,
    album_name TEXT NOT NULL,
    image_number INTEGER,
    date DATE,
    url TEXT NOT NULL,
    front BOOLEAN DEFAULT FALSE NOT NULL
);
    
-- Function to auto increment image_number if album_name is the same
CREATE OR REPLACE FUNCTION update_image_number() 
RETURNS TRIGGER AS $$
DECLARE
    max_value INTEGER;
BEGIN
    IF (TG_OP = 'INSERT') THEN
        -- Find the maximum value of Column_2 for the given Column_1 and increment it
        SELECT COALESCE(MAX(image_number), 0) + 1 INTO max_value 
        FROM images 
        WHERE album_name = NEW.album_name;

        -- Set the new Column_2 value
        NEW.image_number := max_value;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_images
BEFORE INSERT ON images
FOR EACH ROW
EXECUTE FUNCTION update_image_number();


-- Reset images_id
TRUNCATE TABLE images RESTART IDENTITY;