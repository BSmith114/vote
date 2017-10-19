CREATE TABLE fips
(
    fips INT
    ,county TEXT
    ,state TEXT
);

--Copies data to table - use your own path here

COPY fips FROM '/home/ubuntu/projects/d3-putzing/sql/data/geo/fips/fips.csv' WITH CSV HEADER DELIMITER AS ',';