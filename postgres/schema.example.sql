
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS sess;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photos;


-- CREATE SCHEMA sdc
CREATE TABLE sess(
  session_id INT PRIMARY KEY,
  session_name VARCHAR(255)
);

CREATE TABLE cart(
  id INT PRIMARY KEY,
  session_id INT,
  product_id INT,
  active INT,
  CONSTRAINT fk_sess FOREIGN KEY(session_id) REFERENCES sess(session_id)
);

\COPY cart from '~/Documents/HR/sdc/overview-api/raw/cart.csv' delimiter ',' csv header;

INSERT INTO sess(session_id, session_name)
  VALUES
    (1234, 'session 1'),
    (4321, 'session 2'),
    (1111, 'session 3');

CREATE TABLE styles (
  id INTEGER PRIMARY KEY,
  productId INTEGER,
  name VARCHAR(75),
  photos JSON
);

CREATE TABLE photos(
  id INTEGER PRIMARY KEY,
  styleId INTEGER,
  photoObj JSON,
  CONSTRAINT fk_photo FOREIGN KEY(styleId) REFERENCES styles(id) ON DELETE CASCADE
);

INSERT INTO styles(id, productId, name)
  VALUES
    (1,1,'style1','[ { "url": "style1photo1", "thumbnail_url":"style1photo1thumb" }, { "url": "style1photo2", "thumbnail_url":"style1photo2thumb" } ]'),
    (2,1,'style2','[ { "url": "style2photo1", "thumbnail_url":"style2photo1thumb" }, { "url": "style2photo2", "thumbnail_url":"style2photo2thumb" } ]');

-- INSERT INTO photos(id, styleId, photoObj)
  -- VALUES
  --   ()
--  psql -U your_user -d your_db -f filename.sql
--  psql -d sdc_test -f schema.sql [from postgres folder - put into an npm script ? :)]
