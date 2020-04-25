SELECT yearstart, yearend, locationabbr, locationdesc, datasource, class, topic, question, data_value_unit, data_value_type, data_value, data_value_alt, data_value_footnote_symbol, data_value_footnote, low_confidence_limit, high_confidence_limit, sample_size, total, age, education, gender, income, race_ethnicity, geolocation, classid, topicid, questionid, datavaluetypeid, locationid, stratificationcategory1, stratification1, stratificationcategoryid1, stratificationid1
	FROM public.chronic;
	
select distinct age from chronic;

select distinct (yearstart,yearend) from chronic;

select distinct class from chronic; -- Category

select distinct topic from chronic; -- Sub Category // Not Required

select distinct education from chronic; -- sub list

select distinct gender from chronic; -- sub list

select distinct age from chronic; -- sub list

select distinct income from chronic; -- Sub list

select distinct total from chronic; -- Direct Display

select distinct race_ethnicity from chronic; -- Sub List