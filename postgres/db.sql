-- SQL commands to create SDC db

DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

--  psql -d test -f db.sql
-- \psql -d sdc -c "\copy products from '~/Documents/HR/sdc/overview-api/raw/product.csv' delimiter ',' csv header;"