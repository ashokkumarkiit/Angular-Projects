const express = require('express');
const path = require('path');
const us_states = require('./us-states.json');

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
    let max_val = 0
    let us_state_coord_mapping = {}
    let us_result = []
    let non_us_results = []
    pool.query(/* `select country_region,sum(confirmed) as confirmed,
    sum(deaths) as deaths, sum(recovered) as recovered
    from covid_daily_report group by country_region order by confirmed desc`*/`select max(confirmed) from (select province_state,country_region,sum(confirmed) as confirmed,
	  sum(deaths) as deaths, sum(recovered) as recovered
	  from covid_daily_report group by country_region,province_state order by confirmed desc) as tbl`, null, (error, results) => {
      if (error) {
        throw error
      }
      /*  results.rows.forEach(row => {
        country_max[row.country_region] = row.confirmed
      }); */

      // console.log(country_max);

      max_val = results.rows[0].max
    })

    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync(path.join(__dirname, 'us-states.json'), 'utf8'));

    // console.log(obj.states);
    obj.states.forEach(row => {
      us_state_coord_mapping[row.name] = row
      });
    // onsole.log(us_state_coord_mapping);
    // console.log(Object.keys(us_state_coord_mapping).length);

    /* US Data */
    pool.query(`select province_state,country_region, sum(confirmed) as confirmed, sum(deaths) as deaths, sum(recovered) as recovered--, latitude, longitude 
    from covid_daily_report 
    where (longitude != 0.0 or latitude != 0.0)
    and country_region = 'US'
    group by province_state, country_region
    order by confirmed desc;`, null, (error, results) => {
      if (error) {
        throw error
      }
      us_result = results.rows.map(row => {
        let radius = 15;
        let cal_radius = (row.confirmed/max_val)*50;
        if (cal_radius > 20 )
          radius = (row.confirmed/max_val)*50
        else
          radius = 10
        // console.log(us_state_coord_mapping[row.province_state].lat)
        return {
          province_state: row.province_state,
          country_region: row.country_region,
          radius: radius,//(row.confirmed/max_val)*50, //(row.confirmed/parseInt(country_max[row.country_region]))*50,
          fillKey: 'bubbleColorLightRed',
          confirmed: row.confirmed,
          deaths: row.deaths,
          recovered: row.recovered,
          active: row.confirmed - (row.deaths + row.recovered),
          latitude: us_state_coord_mapping[row.province_state].lat,
          longitude: us_state_coord_mapping[row.province_state].long
        }
      });
    })
    
    pool.query(`select province_state,country_region, confirmed, deaths, recovered, latitude, longitude 
    from covid_daily_report where (longitude != 0.0 or latitude != 0.0)
    and country_region != 'US';`, null, (error, results) => {
      if (error) {
        throw error
      }

      non_us_results = results.rows.map(row => {
        let cal_radius = (row.confirmed/max_val)*50;
        if (cal_radius > 20 )
          radius = (row.confirmed/max_val)*50
        else
          radius = 10
        return {
          province_state: row.province_state,
          country_region: row.country_region,
          radius: radius, // (row.confirmed/max_val)*50, // (row.confirmed/parseInt(country_max[row.country_region]))*50,
          fillKey: 'bubbleColorLightRed',
          confirmed: row.confirmed,
          deaths: row.deaths,
          recovered: row.recovered,
          active: row.confirmed - (row.deaths + row.recovered),
          latitude: row.latitude,
          longitude: row.longitude
        }
      })

      res.status(200).json(
        { 
          'success': true,
          'world_location': us_result.concat(non_us_results) /* results.rows.map(row => {
            // console.log(results.rows[0]);
            return {
              province_state: row.province_state,
              country_region: row.country_region,
              radius: (row.confirmed/max_val)*100, // (row.confirmed/parseInt(country_max[row.country_region]))*50,
              fillKey: 'bubbleColorLightRed',
              confirmed: row.confirmed,
              deaths: row.deaths,
              recovered: row.recovered,
              active: row.confirmed - (row.deaths + row.recovered),
              latitude: row.latitude,
              longitude: row.longitude
            }
          })*/,
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


router.route('/timeseries-confirmed').get((req, res) => {
  try{

    pool.query(`select category,TO_CHAR(TO_DATE(report_date, 'MM/dd/YY'),'MM-dd-YYYY') as report_date, sum(total) as total 
    from covid_timeseries_report 
    where category = 'confirmed'
    group by category,report_date order by total;`, null, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'timeseries_data': /* results.rows*/ results.rows.map(row => {
            return {
              category: row.category,
              report_date: row.report_date,
              total: parseInt(row.total)
            }
          }),
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
