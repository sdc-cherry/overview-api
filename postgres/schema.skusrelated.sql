
ALTER TABLE IF EXISTS skus
  DROP CONSTRAINT IF EXISTS fk_sku;
ALTER TABLE IF EXISTS related
  DROP CONSTRAINT IF EXISTS fk_current;
ALTER TABLE IF EXISTS related
  DROP CONSTRAINT IF EXISTS fk_related;

DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS related;

CREATE TABLE skus (
  id INTEGER PRIMARY KEY,
  styleId INTEGER,
  size VARCHAR(10),
  quantity SMALLINT,
  CONSTRAINT fk_sku FOREIGN KEY(styleId) REFERENCES styles(id) ON DELETE CASCADE
);

\COPY skus from '~/Documents/HR/sdc/overview-api/raw/skus.csv' delimiter ',' csv header;

CREATE TABLE related (
  id INTEGER PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER
  -- CONSTRAINT fk_current FOREIGN KEY(current_product_id) REFERENCES products(id) ON DELETE CASCADE,
  -- CONSTRAINT fk_related FOREIGN KEY(related_product_id) REFERENCES products(id) ON DELETE CASCADE
);

\COPY related from '~/Documents/HR/sdc/overview-api/raw/related.csv' delimiter ',' csv header;

--  psql -U your_user -d your_db -f filename.sql
--  \psql -d sdc -f schema.sql [from postgres folder - put into an npm script ? :)]