--DROP FUNCTION ufn_get_state_results_by_county(text, int);
--SELECT * FROM ufn_get_state_results_by_county('New York', 2016)
CREATE OR REPLACE FUNCTION ufn_get_state_results_by_county(state TEXT, election INT)
	RETURNS TABLE (
		county TEXT,
		dem BIGINT,
		rep BIGINT,
		other BIGINT,
		dem_per NUMERIC(5,3),
		rep_per NUMERIC(5,3),
		oth_per NUMERIC(5,3)
	)
AS $$
BEGIN
	RETURN QUERY 
	SELECT
		v.county
		,v.dem
		,v.rep
		,v.other
		,(v.dem_percent * 100)::NUMERIC(3,1)
		,(v.rep_percent * 100)::NUMERIC(3,1)
		,(v.oth_percent * 100)::NUMERIC(3,1)
	FROM
		vw_pres_vote_shift v
	WHERE
		v.state = $1
		and v.election = $2
	ORDER BY
		v.county;
END; $$
LANGUAGE 'plpgsql';