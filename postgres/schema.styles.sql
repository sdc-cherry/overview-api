
DROP CONSTRAINT IF EXISTS fk_style;
DROP CONSTRAINT IF EXISTS fk_photo;
DROP CONSTRAINT IF EXISTS fk_sku;
DROP CONSTRAINT IF EXISTS fk_current;
DROP CONSTRAINT IF EXISTS fk_related;

DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS related;


-- CREATE SCHEMA sdc


CREATE TABLE styles (
  id INTEGER PRIMARY KEY,
  productId INTEGER,
  name VARCHAR(75),
  sale_price VARCHAR(12),
  original_price INTEGER,
  default_style BOOLEAN,
  CONSTRAINT fk_style FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
);

\COPY styles from '~/Documents/HR/sdc/overview-api/raw/styles.csv' delimiter ',' csv header;

