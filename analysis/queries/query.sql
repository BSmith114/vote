select 
    f.fips
    ,s.dem
    ,s.rep
    ,s.other
    ,s.ddiff
    ,s.rdiff
    ,s.odiff
    ,dem_margin
    ,s.dem_percent_shift
    ,s.rep_percent_shift
    ,s.oth_percent_shift
    ,turnout12.turnout2012
    ,turnout16.turnout2016
from vw_pres_vote_shift s 
    inner join fips f
        on f.fips = s.fips
    inner join (
        select 
            election
            ,cvap.fips
            ,(sum(pres_vote.vote)::decimal / cvap.cvap::decimal)::decimal turnout2012
        from cvap
            inner join pres_vote 
                on cvap.fips = pres_vote.fips		
                and cvap.year = 2012
            inner join fips f
                on f.fips = cvap.fips
        where pop_group = 'Total' and election = 2012
        group by cvap.fips, cvap.cvap, election        
    ) turnout12
        on turnout12.fips = f.fips
    inner join (
        select 
            election
            ,cvap.fips
            ,(sum(pres_vote.vote)::decimal / cvap.cvap::decimal)::decimal turnout2016
        from cvap
            inner join pres_vote 
                on cvap.fips = pres_vote.fips		
                and cvap.year = 2015
            inner join fips f
                on f.fips = cvap.fips
        where pop_group = 'Total' and election = 2016
        group by cvap.fips, cvap.cvap, election        
    ) turnout16
        on turnout16.fips = f.fips
where 1 = 1 
    and s.election = 2016