SELECT yearstart, yearend, locationabbr, locationdesc, datasource, class, topic, question, data_value_unit, data_value_type, data_value, data_value_alt, data_value_footnote_symbol, data_value_footnote, low_confidence_limit, high_confidence_limit, sample_size, total, age, education, gender, income, race_ethnicity, geolocation, classid, topicid, questionid, datavaluetypeid, locationid, stratificationcategory1, stratification1, stratificationcategoryid1, stratificationid1
	FROM public.chronic;
	
select distinct age from chronic;

select distinct yearstart as year from chronic where yearstart is not null and class='Fruits and Vegetables' order by year asc;

select distinct class from chronic; -- Category

select distinct topic from chronic; -- Sub Category // Not Required

select distinct education as option_value from chronic where education is not null and class='Fruits and Vegetables' order by option_value; -- sub list

select distinct gender from chronic where class='Fruits and Vegetables'; -- sub list

select distinct age from chronic where class='Fruits and Vegetables'; -- sub list

select distinct income from chronic; -- Sub list

select distinct total from chronic; -- Direct Display

select distinct race_ethnicity from chronic; -- Sub List

select * from (select to_char(to_date(report_date,'yyyy-mm-dd hh24:mi:ss'),'mm-dd-yyyy') as report_date,
			   total,data_type, category from health_analytics_covid_us_confirmed
Union
select to_char(to_date(report_date,'yyyy-mm-dd hh24:mi:ss'),'mm-dd-yyyy') as report_date,
			   total,data_type, category from health_analytics_covid_us_deaths) as tbl order by report_date;

select to_char(to_date(report_date,'yyyy-mm-dd hh24:mi:ss'),'mm-dd-yyyy') from health_analytics_covid_us_deaths;

select locationabbr, min(data_value) as data_value from chronic
	where topic = 'Obesity / Weight Status' 
	and yearstart = '2018' and gender = 'Male' 
	group by locationabbr
	order by data_value ;

select max(data_value) as max_val, min(data_value) as min_val  --locationabbr, min(data_value) as data_value 
		from chronic
        where class = 'Fruits and Vegetables' 
        and yearstart = '2017' 
		and age = '18 - 24'
				  
				  -- and locationabbr = 'TX'
                  -- group by locationabbr
                  -- order by data_value ;

select locationdesc as location, max(data_value) as data_value from chronic
                  where class = 'Obesity / Weight Status' 
                  and yearstart = '2018' and Age = '45 - 54' 
                  group by locationdesc
                  order by locationdesc ;
