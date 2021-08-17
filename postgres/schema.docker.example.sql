

DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS sess;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photos;


-- CREATE SCHEMA sdc
CREATE TABLE sess(
  session_id INT PRIMARY KEY,
  session_name VARCHAR(255)
);

INSERT INTO sess(session_id, session_name)
  VALUES
    (1234, 'session 1'),
    (4321, 'session 2'),
    (1111, 'session 3');

CREATE TABLE cart(
  id INT PRIMARY KEY,
  session_id INT,
  product_id INT,
  active INT,
  CONSTRAINT fk_sess FOREIGN KEY(session_id) REFERENCES sess(session_id)
);

-- ~ = /var/lib/postgresql/
-- \COPY cart from '~/cart.csv' delimiter ',' csv header;

-- INSERT INTO photos(id, styleId, photoObj)
  -- VALUES
  --   ()
--  psql -U your_user -d your_db -f filename.sql
--  psql -d sdc_test -f schema.sql [from postgres folder - put into an npm script ? :)]
