
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS related;


-- CREATE SCHEMA sdc
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  default_price INTEGER
);

CREATE TABLE features (
  id SMALLINT PRIMARY KEY,
  product_id SMALLINT,
  feature VARCHAR(75),
  value VARCHAR(75),
  CONSTRAINT fk_feat FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE styles (
  id SMALLINT PRIMARY KEY,
  productId SMALLINT,
  name VARCHAR(75),
  sale_price INTEGER,
  original_price INTEGER,
  default_style BOOLEAN,
  CONSTRAINT fk_style FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE photos (
  id SMALLINT PRIMARY KEY,
  styleId SMALLINT,
  url VARCHAR(255),
  thumbnail_url VARCHAR(255),
  CONSTRAINT fk_photo FOREIGN KEY(styleId) REFERENCES styles(id) ON DELETE CASCADE
);

CREATE TABLE skus (
  id SMALLINT PRIMARY KEY,
  styleId SMALLINT,
  size VARCHAR(3),
  quantity SMALLINT,
  CONSTRAINT fk_photo FOREIGN KEY(styleId) REFERENCES styles(id) ON DELETE CASCADE
);

CREATE TABLE related (
  id SMALLINT PRIMARY KEY,
  current_product_id SMALLINT,
  related_product_id SMALLINT,
  CONSTRAINT fk_current FOREIGN KEY(current_product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_related FOREIGN KEY(related_product_id) REFERENCES products(id) ON DELETE CASCADE
);

--  psql -U your_user -d your_db -f filename.sql
--  \psql -d sdc -f schema.sql [from postgres folder - put into an npm script ? :)]