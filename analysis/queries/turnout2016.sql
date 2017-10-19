select 
	election
	,cvap.fips
	,(sum(pres_vote.vote)::decimal / cvap.cvap::decimal)::decimal turnout
from cvap
	inner join pres_vote 
		on cvap.fips = pres_vote.fips		
		and cvap.year = 2015
	inner join fips f
		on f.fips = cvap.fips
where pop_group = 'Total' and election = 2016
group by cvap.fips, cvap.cvap, election
order by turnout desc
