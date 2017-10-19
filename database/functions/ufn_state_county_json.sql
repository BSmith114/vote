CREATE OR REPLACE FUNCTION ufn_state_county_json()
	RETURNS TEXT
AS $$
DECLARE 
	states TEXT;
BEGIN	
	states:= REPLACE(REPLACE(REPLACE(REPLACE( array_agg(details)::TEXT, '\',''),'""','"'), ']",','],'), '"}', '}')
	FROM
	(
		SELECT  to_json(state) || ':' || (array_to_json(array_agg(county)))::TEXT AS details
		FROM fips
		GROUP BY state
		ORDER BY state
	) s;
	RETURN states;
END; $$
LANGUAGE 'plpgsql'
