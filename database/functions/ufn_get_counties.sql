--DROP FUNCTION ufn_get_counties()
--SELECT ufn_get_counties('Minnesota')
CREATE OR REPLACE FUNCTION ufn_get_counties(state text)
	RETURNS JSON
AS $$
DECLARE 
	counties JSON;
BEGIN
	counties := array_to_json(array_agg(s.counties))
	FROM 
	(
		SELECT
			array_to_json(ARRAY[fips::text,county::text]) counties
		FROM
			fips f
		WHERE
			f.state = $1
	) s;
	RETURN counties;
END; $$
LANGUAGE 'plpgsql'




	
	