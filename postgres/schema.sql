
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

\COPY products from '~/Documents/HR/sdc/overview-api/raw/product.csv' delimiter ',' csv header;

CREATE TABLE features (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  feature VARCHAR(75),
  value VARCHAR(75),
  CONSTRAINT fk_feat FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

\COPY features from '~/Documents/HR/sdc/overview-api/raw/features.csv' delimiter ',' csv header;

CREATE TABLE styles (
  id INTEGER PRIMARY KEY,
  productId INTEGER,
  name VARCHAR(75),
  sale_price INTEGER DEFAULT NULL,
  original_price INTEGER,
  default_style BOOLEAN,
  CONSTRAINT fk_style FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
);

\COPY styles from '~/Documents/HR/sdc/overview-api/raw/styles.csv' delimiter ',' csv header;

CREATE TABLE photos (
  id INTEGER PRIMARY KEY,
  styleId INTEGER,
  url VARCHAR(255),
  thumbnail_url VARCHAR(255),
  CONSTRAINT fk_photo FOREIGN KEY(styleId) REFERENCES styles(id) ON DELETE CASCADE
);

\COPY photos from '~/Documents/HR/sdc/overview-api/raw/photos.csv' delimiter ',' csv header;

CREATE TABLE skus (
  id INTEGER PRIMARY KEY,
  styleId INTEGER,
  size VARCHAR(3),
  quantity SMALLINT,
  CONSTRAINT fk_photo FOREIGN KEY(styleId) REFERENCES styles(id) ON DELETE CASCADE
);

\COPY skus from '~/Documents/HR/sdc/overview-api/raw/skus.csv' delimiter ',' csv header;

CREATE TABLE related (
  id INTEGER PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER,
  CONSTRAINT fk_current FOREIGN KEY(current_product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_related FOREIGN KEY(related_product_id) REFERENCES products(id) ON DELETE CASCADE
);

\COPY related from '~/Documents/HR/sdc/overview-api/raw/related.csv' delimiter ',' csv header;

--  psql -U your_user -d your_db -f filename.sql
--  \psql -d sdc -f schema.sql [from postgres folder - put into an npm script ? :)]