const express = require('express');

const { Pool } = require('pg')

var bodyParser = require('body-parser');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'covid_19',
  password: 'ashok0898',
  port: 5432,
});

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.route('/countries-total').get((req, res) => {
  try{

    pool.query(`select country_region,sum(confirmed) as confirmed,
    sum(deaths) as deaths, sum(recovered) as recovered
    from covid_daily_report group by country_region order by confirmed desc;`, null, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'countries_total': results.rows,
        });
    })
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/world-total').get((req, res) => {
  try{

    pool.query(`select sum(confirmed) as confirmed,
    sum(deaths) as deaths, sum(recovered) as recovered
    from covid_daily_report;`, null, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'world_total': results.rows,
        });
    })
    /* 
    const query = {
        name: 'fetch-exercise-detail',
        text: `select e.id,e.name,e.description,ec.name as ex_cat_name
                from exercise as e, exercisecategory as ec
                where e.category = ec.id
                and e. id=${id};`,
    }
    console.log(query.text)

    find_exercise_detail_from_wger(query).then(function (response) {
        res.json(
          { 
            'success': true,
            'exercise_detail': exercise_detail,
          });
    }); */
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/exercise/muscle/:id').get((req, res) => {
  try{
    var id = req.params.id;

    pool.query(`select ex_id,mu_id, name, is_front from map_exercise_muscle as em, muscle as m 
    where em.mu_id = m.id
    and ex_id=$1`, [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'exercise_muscle': results.rows,
        });
    })

    /* 
    const query = {
        name: 'fetch-exercise-muscle',
        text: `select ex_id,mu_id, name, is_front from map_exercise_muscle as em, muscle as m 
                where em.mu_id = m.id
                and ex_id=${id};`,
    }

    find_exercise_muscle_from_wger(query).then(function (response) {
        res.json(
          { 
            'success': true,
            'exercise_muscle': exercise_muscles,
          });
    }); */
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/exercise/equipment/:id').get((req, res) => {
  try{
    var id = req.params.id;

    pool.query(`select ex_id,eq_id,name from 
    map_exercise_equipment as ee, equipment as eq
    where ee.eq_id = eq.id
    and ex_id=$1`, [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'exercise_equipment': results.rows,
        });
    })
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

app.use('/', router);

app.listen(4000, () => {

            console.log('Make sure you execute following command before you start the Angular client');

            console.log('');            
            console.log('--------------------------------------------------------');
            console.log('');

            console.log('Express server running on port 4000')
});
