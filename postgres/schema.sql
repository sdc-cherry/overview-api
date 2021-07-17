

CREATE TABLE cart(
  id INT PRIMARY KEY,
  session INT,
  product_id INT,
  active INT
);

--  psql -U your_user -d your_db -f filename.sql
--  psql -d sdc_test -f schema.sql [from postgres folder - put into an npm script ? :)]