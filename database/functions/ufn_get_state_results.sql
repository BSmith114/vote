--DROP FUNCTION ufn_get_state_results(int);
--SELECT * FROM ufn_get_state_results(2016)
CREATE OR REPLACE FUNCTION ufn_get_state_results(election INT)
	RETURNS TABLE (
		state TEXT,
		dem NUMERIC,
		rep NUMERIC,
		other NUMERIC,
		dem_percent NUMERIC(3,1),
		rep_percent NUMERIC(3,1),
		oth_percent NUMERIC(3,1)
	)
AS $$
BEGIN

	RETURN QUERY 
	SELECT
		v.state
		,SUM(v.dem)
		,SUM(v.rep)
		,SUM(v.other)
		,((SUM(v.dem) / (SUM(v.dem) + SUM(v.rep) + SUM(v.other))) * 100)::NUMERIC(3,1)
		,((SUM(v.rep) / (SUM(v.dem) + SUM(v.rep) + SUM(v.other))) * 100)::NUMERIC(3,1)
		,((SUM(v.other) / (SUM(v.dem) + SUM(v.rep) + SUM(v.other))) * 100)::NUMERIC(3,1)
	FROM
		vw_pres_vote_shift v
	WHERE
		v.election = $1
	GROUP BY
		v.state
	ORDER BY
		v.state;
END; $$
LANGUAGE 'plpgsql';