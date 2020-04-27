SELECT yearstart, yearend, locationabbr, locationdesc, datasource, class, topic, question, data_value_unit, data_value_type, data_value, data_value_alt, data_value_footnote_symbol, data_value_footnote, low_confidence_limit, high_confidence_limit, sample_size, total, age, education, gender, income, race_ethnicity, geolocation, classid, topicid, questionid, datavaluetypeid, locationid, stratificationcategory1, stratification1, stratificationcategoryid1, stratificationid1
	FROM public.chronic;
	
select distinct age from chronic;

select distinct yearstart as year from chronic where yearstart is not null order by year asc;

select distinct class from chronic; -- Category

select distinct topic from chronic; -- Sub Category // Not Required

select distinct education as option_value from chronic where education is not null order by option_value; -- sub list

select distinct gender from chronic; -- sub list

select distinct age from chronic; -- sub list

select distinct income from chronic; -- Sub list

select distinct total from chronic; -- Direct Display

select distinct race_ethnicity from chronic; -- Sub List

select * from health_analytics_covid_us;

select locationabbr, min(data_value) as data_value from chronic
	where topic = 'Obesity / Weight Status' 
	and yearstart = '2018' and gender = 'Male' 
	group by locationabbr
	order by data_value ;
