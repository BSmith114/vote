copy (
    with vote as (
        select 
            election
            ,case
				when length(fips::text) = 4
					then '0'::text || fips::text
				else fips::text
			end as fips
            ,county
            ,state
            ,dem
            ,rep
            ,other
            ,total
            ,total - lag(total, 1, total) OVER (partition by fips Order by election asc) as tdiff
            ,dem - lag(dem, 1, dem) OVER (partition by fips Order by election asc) as ddiff
            ,rep - lag(rep, 1, rep) OVER (partition by fips Order by election asc) as rdiff
            ,other - lag(other, 1, other) OVER (partition by fips Order by election asc) as odiff
            ,dem - rep as dem_raw_margin
            ,(dem - rep) - lag(dem - rep, 1) OVER (partition by fips Order by election asc) dem_raw_margin_shift
            ,(dem::decimal/total::decimal) as dem_percent
            ,(rep::decimal/total::decimal) as rep_percent
            ,(other::decimal/total::decimal) as oth_percent
            ,(dem::decimal/total::decimal) - (rep::decimal/total::decimal) as dem_margin
            ,case
                when election = 2000
                    then null
                when (dem > rep) = (lag(dem, 1) OVER (partition by fips Order by election asc) >  lag(rep, 1, rep) OVER (partition by fips Order by election asc))
                    then 0	
                else 1
            end flip
        from vw_pres_vote
    )

    select 
        election
        ,fips
        ,county
        ,state
        ,dem
        ,rep
        ,other
        ,total
        ,tdiff as total_raw_vote_shift
        ,rdiff as rep_raw_vote_shift
        ,ddiff as dem_raw_vote_shift
        ,odiff as other_raw_vote_shift
        ,dem_raw_margin 
        ,dem_raw_margin - lag(dem_raw_margin, 1) OVER (partition by fips order by election asc) as dem_raw_margin_shift
        ,dem_percent 
        ,rep_percent
        ,oth_percent as other_percent
        ,dem_percent  - lag(dem_percent, 1) OVER (partition by fips order by election asc) as dem_percent_shift
        ,rep_percent  - lag(rep_percent, 1) OVER (partition by fips order by election asc) as rep_percent_shift
        ,oth_percent  - lag(oth_percent, 1) OVER (partition by fips order by election asc) as other_percent_shift
        ,dem_margin as dem_percent_margin
        ,dem_margin - lag(dem_margin, 1) OVER (partition by fips order by election asc) as dem_percent_margin_shift
        ,case 
            when dem_margin > 0 and	flip = 1
                then 'Dem'
            when dem_margin < 0 and flip = 1
                then 'GOP'
        end as flip
    from 
        vote 
 ) to '/home/ubuntu/projects/vote/analysis/data/vote.csv' with CSV DELIMITER ',' HEADER;