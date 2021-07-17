-- SQL commands to create SDC db

DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

--  psql -d test -f db.sql
-- \psql -d sdc_test -c "\copy cart from '~/Documents/HR/sdc/overview-api/raw/cart.csv' delimiter ',' csv header;"