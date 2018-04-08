select
	election
	,f.state
	,case 
		when party ilike '%democrat%'
			then 'Democrat' 
		when party ilike '%republican%'
			then 'Republican'
		else 'Other'
	end as party
	,sum(votes) as vote
from vote v
	inner join fips f 
		on f.fips = v.fips
group by 
    state    
    ,election
    ,case 
		when party ilike '%democrat%'
			then 'Democrat' 
		when party ilike '%republican%'
			then 'Republican'
		else 'Other'
	end 
order by election, state
