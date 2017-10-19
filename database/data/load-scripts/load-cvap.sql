--drop table popdump
create temporary table popdump
(
    geoname TEXT    
	,pop_group TEXT
    ,fips TEXT   
    ,linenumber INT
    ,total INT
    ,total_moe INT 
    ,adult INT
    ,adult_moe INT
    ,citizens INT
    ,citizens_moe INT
    ,cvap INT
    ,cvap_moe INT
) ON COMMIT DROP;

COPY popdump FROM '/home/ubuntu/projects/d3-putzing/sql/data/demographics/2012_CVAP_county.csv' WITH CSV HEADER DELIMITER AS ',';

insert into cvap
select
	RIGHT(p.fips, 5)::INT
	,2012 as year
	,pop_group
	,linenumber
	,total
	,total_moe 
	,adult
	,adult_moe
	,citizens
	,citizens_moe
	,cvap
	,cvap_moe
from popdump p
	
