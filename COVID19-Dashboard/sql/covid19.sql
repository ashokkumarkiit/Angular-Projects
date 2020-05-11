SELECT province_state, country_region, 
	last_updated, confirmed, deaths, recovered, latitude, longitude
	FROM public.covid_daily_report;

-- World Total
select sum(confirmed) as confirmed,
    sum(deaths) as deaths, sum(recovered) as recovered
    from covid_daily_report;

-- Query to fetch country wise total report */
select max(confirmed) from (select country_region,sum(confirmed) as confirmed,
	sum(deaths) as deaths, sum(recovered) as recovered
	from covid_daily_report group by country_region order by confirmed desc) as tbl;

select max(confirmed) from (select province_state,country_region,sum(confirmed) as confirmed,
	sum(deaths) as deaths, sum(recovered) as recovered
	from covid_daily_report group by country_region,province_state order by confirmed desc) as tbl
	
	
-- Map Query
select province_state,country_region, confirmed, deaths, recovered, latitude, longitude 
    from covid_daily_report where longitude != 0.0 or latitude != 0.0;

select province_state,country_region, sum(confirmed) as confirmed, sum(deaths) as deaths, sum(recovered) as recovered--, latitude, longitude 
    from covid_daily_report 
	where (longitude != 0.0 or latitude != 0.0)
	and country_region = 'US'
	--and province_state in ('Virgin Islands','Puerto Rico','Northern Mariana Islands','Guam','District of Columbia')
	group by province_state, country_region
	order by confirmed desc;

select * from covid_daily_report where province_state in ('Virgin Islands','Puerto Rico','Northern Mariana Islands','Guam','District of Columbia') and country_region = 'US'


select * from (select province_state,country_region, sum(confirmed) as confirmed, sum(deaths) as deaths, sum(recovered) as recovered --, latitude, longitude 
from covid_daily_report where longitude != 0.0 or latitude != 0.0 group by province_state,country_region) as tbl,covid_daily_report co 
where tbl.province_state = co.province_state
and tbl.country_region = co.country_region
and tbl.province_state in 'New York';


-- Time Series Report
select category,TO_CHAR(TO_DATE(report_date, 'MM/dd/YY'),'MM-dd-YYYY'), report_date,sum(total) as total 
from covid_timeseries_report 
group by category,report_date order by total;


select category,TO_CHAR(TO_DATE(report_date, 'MM/dd/YY'),'MM-dd-YYYY') as report_date, sum(total) as total 
from covid_timeseries_report 
where category = 'confirmed'
group by category,report_date order by total;

select category,TO_CHAR(TO_DATE(report_date, 'MM/dd/YY'),'MM-dd-YYYY') as report_date, sum(total) as total 
    from covid_timeseries_report 
    where category in ('deaths', 'recovered')
    group by category,report_date order by report_date;
	
select province_state,sum(confirmed) as confirmed, sum(deaths) as deaths, sum(recovered) as recovered 
	from covid_daily_report_us where country_region = 'US' and upper(province_state) != upper('Recovered')  group by province_state order by confirmed desc;

select province_state,country_region, confirmed, deaths, recovered, latitude, longitude 
    from covid_daily_report where (longitude != 0.0 or latitude != 0.0)
    and country_region != 'US'
	UNION
select province_state,country_region, confirmed, deaths, recovered, latitude, longitude 
    from covid_daily_report_us 
    where (longitude != 0.0 or latitude != 0.0)
    and country_region = 'US'
	and upper(province_state) != upper('Recovered')
    order by confirmed desc;
	
-- ########################################################## NEw Queries with changes col name

select country_region,sum(confirmed) as total
    from covid_daily_report group by country_region order by total desc;
	
select country_region,sum(deaths) as total
    from covid_daily_report group by country_region order by total desc;
	
select country_region,sum(recovered) as total
    from covid_daily_report group by country_region order by total desc;

select sum(confirmed) as confirmed,
    sum(deaths) as deaths, sum(recovered) as recovered
    from covid_daily_report;
	
select max(confirmed) from (select province_state,country_region,sum(confirmed) as confirmed,
	  sum(deaths) as deaths, sum(recovered) as recovered
	  from covid_daily_report group by country_region,province_state order by confirmed desc) as tbl
	  
select province_state,country_region, confirmed, deaths, recovered, lat as latitude, long_ as longitude
    from covid_daily_report where (long_ != 0.0 or lat != 0.0)
    and country_region != 'US'
	UNION
select province_state,country_region, confirmed, deaths, recovered, lat as latitude, long_ as longitude
    from covid_daily_report_us 
    where (long_ != 0.0 or lat != 0.0)
    -- and country_region = 'US'
	
select province_state,sum(confirmed) as confirmed, sum(deaths) as deaths, sum(recovered) as recovered 
    from covid_daily_report_us where country_region = 'US' and upper(province_state) != upper('Recovered') 
    group by province_state order by confirmed desc;
	
select * from covid_daily_report_us;
