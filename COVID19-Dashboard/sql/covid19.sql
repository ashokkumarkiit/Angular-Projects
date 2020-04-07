SELECT province_state, country_region, 
	last_updated, confirmed, deaths, recovered, latitude, longitude
	FROM public.covid_daily_report;

-- World Total
select sum(confirmed) as confirmed,
    sum(deaths) as deaths, sum(recovered) as recovered
    from covid_daily_report;

-- Query to fetch country wise total report */
select country_region,sum(confirmed) as confirmed,
	sum(deaths) as deaths, sum(recovered) as recovered
	from covid_daily_report group by country_region order by confirmed desc;
