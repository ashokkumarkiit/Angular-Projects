-- 2 for English

/* Exercise with Image */
select * from exercise as e LEFT JOIN exerciseimage as ei
	on e.id = ei.exercise
	where upper(name) not in('',upper('test')) 
	and category=10 
	and language=2 order by name;
	
select * from exercise
	where upper(name) not in('',upper('test'),upper('Abcd'),upper('Awesome'))
	and category=8 and language=2 order by name;

-- Fetch Muscle based on exercise id
select ex_id,mu_id, name, is_front from map_exercise_muscle as em, muscle as m 
where em.mu_id = m.id
and ex_id=5;

-- Fetch Equipment based on exercise id
select ex_id,mu_id, name, is_front from map_exercise_muscle as em, muscle as m 
where em.mu_id = m.id
and ex_id=5;

select * from exercise as e,muscle as m,map_exercise_muscle as em, exerciseimage as ei  where e.id = em.ex_id
and m.id = em.mu_id and e.id = ei.exercise and e.id=5;

select * from exercise as e where e.

/* Exercise based on Category */
select * from exercise where upper(name) not in('',upper('test')) and category=10 and language=2 order by name;

select* from language;

select * from exercisecategory order by name;

select * from exerciseimage;
where id = 129;

select * from muscle order by id;

select * from equipment;


