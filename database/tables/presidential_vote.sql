create table presidential_vote (    
    id serial primary key
    ,fips integer references fips (fips)
    ,election integer
    ,candidate text 
    ,party text 
    ,votes integer
);