--DROP FUNCTION ufn_get_national_results(text, int);
--SELECT * FROM ufn_get_national_results(2016)
CREATE OR REPLACE FUNCTION ufn_get_national_results(election INT)
	RETURNS TABLE (
		dem NUMERIC,
		rep NUMERIC,
		other NUMERIC,
		dem_percent NUMERIC(5,3),
		rep_percent NUMERIC(5,3),
		oth_percent NUMERIC(5,3)
	)
AS $$
DECLARE
	vote_total INT;
BEGIN

	vote_total := SUM(v.total)
	FROM 
		vw_pres_vote_shift v
	WHERE
		v.election = $1;

	RETURN QUERY 
	SELECT
		SUM(v.dem)
		,SUM(v.rep)
		,SUM(v.other)
		,((SUM(v.dem) / vote_total) * 100)::NUMERIC(3,1)
		,((SUM(v.rep) / vote_total) * 100)::NUMERIC(3,1)
		,((SUM(v.other) / vote_total) * 100)::NUMERIC(3,1) 	
	FROM
		vw_pres_vote_shift v
	WHERE
		v.election = $1;
	
END; $$
LANGUAGE 'plpgsql';