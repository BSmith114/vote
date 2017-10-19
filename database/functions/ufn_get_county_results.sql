--DROP FUNCTION ufn_get_county_results(text, text, int);
--SELECT * FROM ufn_get_county_results(2, 2016)
CREATE OR REPLACE FUNCTION ufn_get_county_results(fips INT, election INT)
	RETURNS TABLE (
		dem_raw BIGINT,
		rep_raw BIGINT,
		oth_raw BIGINT,
		dem_per NUMERIC(5,3),
		rep_per NUMERIC(5,3),
		oth_per NUMERIC(5,3)
	)
AS $$
BEGIN
	RETURN QUERY 
	SELECT
		dem, rep, other, dem_percent, rep_percent, oth_percent
	FROM
		vw_pres_vote_shift v
	WHERE
		v.fips = $1
		and v.election = $2;
END; $$
LANGUAGE 'plpgsql';

	