--DROP FUNCTION ufn_get_elections()
--SELECT ufn_get_elections() as elections
CREATE OR REPLACE FUNCTION ufn_get_elections()
	RETURNS JSON
AS $$
DECLARE 
	elections JSON;
BEGIN
	elections := array_to_json(array_agg(election))
	FROM
	(
		SELECT DISTINCT
			election
		FROM 
			pres_vote
		ORDER BY
			election DESC
	) q;
	RETURN elections;	
END; $$
LANGUAGE 'plpgsql'