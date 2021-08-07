

DROP INDEX IF EXISTS product_id_index;
DROP INDEX IF EXISTS features_id_index;
DROP INDEX IF EXISTS styles_multicol_index;
DROP INDEX IF EXISTS skus_styleid_index;
DROP INDEX IF EXISTS photos_styleid_index;
DROP INDEX IF EXISTS related_current_index;

CREATE INDEX product_id_index ON products (id);
CREATE INDEX features_id_index ON features (product_id);
CREATE INDEX styles_multicol_index ON styles (productId,id);
CREATE INDEX skus_styleid_index ON skus (styleId);
CREATE INDEX photos_styleid_index ON photos (styleId);
CREATE INDEX related_current_index ON related (current_product_id);

-- TO RUN:
-- \psql -d sdc -f postgres/indexing.sql