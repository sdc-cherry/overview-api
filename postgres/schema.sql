
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS related;


-- CREATE SCHEMA sdc
CREATE TABLE products (
  id SMALLINT PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  default_price SMALLINT
);



--  psql -U your_user -d your_db -f filename.sql
--  psql -d sdc_test -f schema.sql [from postgres folder - put into an npm script ? :)]