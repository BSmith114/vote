/* 
    copies data into tables in the correct order
*/

copy fips from '/home/ubuntu/projects/vote/raw-data/fips.csv' with (format csv, header true)

copy presidential_vote (fips, election, candidate, party, votes)
    from '/home/ubuntu/projects/vote/raw-data/presidential_vote.csv' with (format csv, header true)