

DROP INDEX IF EXISTS product_id_index;
DROP INDEX IF EXISTS features_id_index;

DROP INDEX IF EXISTS related_id_index;
DROP INDEX IF EXISTS related_current_index;
DROP INDEX IF EXISTS related_related_index;

CREATE INDEX product_id_index ON products (id);
-- CREATE INDEX features_id_index ON features (product_id);
-- styles, sku, and photo indexing
CREATE INDEX related_current_index ON related (current_product_id);

-- TO RUN:
-- \psql -d sdc -f postgres/indexing.sql