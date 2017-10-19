create table party
(
    party text
    ,minorparty text
);

/*
insert into party
select distinct 
	case
		when party like '%Democrat%' 
			then 'Democratic'
		when party like '%Republican%'
			then 'Republican'
		else 'Other'
	end as majparty
	,party
from pres_vote 
order by party;
*/