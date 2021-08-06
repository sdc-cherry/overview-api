
DROP INDEX IF EXISTS related_id_index;
DROP INDEX IF EXISTS related_current_index;
DROP INDEX IF EXISTS related_related_index;

-- CREATE INDEX related_id_index ON related (id);
CREATE INDEX related_current_index ON related (current_product_id);
-- CREATE INDEX related_related_index ON related (related_product_id);


-- TO RUN:
-- \psql -d sdc -f postgres/indexing.sql