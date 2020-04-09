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

router.route('/countries-total/confirmed').get((req, res) => {
  try{

    pool.query(`select country_region,sum(confirmed) as total
    from covid_daily_report group by country_region order by total desc;`, null, (error, results) => {
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

router.route('/countries-total/deaths').get((req, res) => {
  try{

    pool.query(`select country_region,sum(deaths) as total
    from covid_daily_report group by country_region order by total desc;`, null, (error, results) => {
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

router.route('/countries-total/recovered').get((req, res) => {
  try{

    pool.query(`select country_region,sum(recovered) as total
    from covid_daily_report group by country_region order by total desc;`, null, (error, results) => {
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
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/world-locations').get((req, res) => {
  try{

    pool.query(`select province_state,country_region, confirmed, deaths, recovered, latitude, longitude 
    from covid_daily_report where longitude != 0.0 or latitude != 0.0;`, null, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'world_location': results.rows,
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
