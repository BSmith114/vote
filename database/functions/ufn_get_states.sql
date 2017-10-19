--DROP FUNCTION ufn_get_states()
--SELECT ufn_get_states() as states
CREATE OR REPLACE FUNCTION ufn_get_states()
	RETURNS JSON
AS $$
DECLARE 
	states JSON;
BEGIN
	states := array_to_json(array_agg(distinct(state)))
	FROM 
		fips;

	RETURN states;	
END; $$
LANGUAGE 'plpgsql'
