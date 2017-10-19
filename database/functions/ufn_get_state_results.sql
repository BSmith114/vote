--DROP FUNCTION ufn_get_state_results(text, int);
--SELECT * FROM ufn_get_state_results('Minnesota', 2016)
CREATE OR REPLACE FUNCTION ufn_get_state_results(state TEXT, election INT)
	RETURNS TABLE (
		county TEXT,
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
		v.state = $1
		AND v.election = $2;

	RETURN QUERY 
	SELECT
		v.state
		,SUM(v.dem)
		,SUM(v.rep)
		,SUM(v.other)
		,((SUM(v.dem) / vote_total) * 100)::NUMERIC(5,3)
		,((SUM(v.rep) / vote_total) * 100)::NUMERIC(5,3)
		,((SUM(v.other) / vote_total) * 100)::NUMERIC(5,3) 	
	FROM
		vw_pres_vote_shift v
	WHERE
		v.state = $1
		and v.election = $2
	GROUP BY
		v.state;
	
END; $$
LANGUAGE 'plpgsql';