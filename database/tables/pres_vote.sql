CREATE TABLE pres_vote
(
    fips INT
    ,election INT
    ,candidate TEXT
    ,party TEXT
    ,vote INT
);

--Copies data to table - use your own path here

COPY pres_vote FROM '/home/ubuntu/projects/d3-putzing/sql/data/vote/county/2000-2016-presidential-vote-by-county.csv' WITH CSV HEADER DELIMITER AS ',';