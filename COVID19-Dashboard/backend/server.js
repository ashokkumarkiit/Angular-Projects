////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//////////////////////              SETUP NEEDED                ////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//  Install Nodejs (the bundle includes the npm) from the following website:
//      https://nodejs.org/en/download/


//  Before you start nodejs make sure you install from the
//  command line window/terminal the following packages:
//      1. npm install express
//      2. npm install pg



////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

const express = require('express');

const { Pool } = require('pg')

var bodyParser = require('body-parser');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'covid_19',
  password: 'root',
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
    let max_val = 203020 /* Default Value */
    let non_us_results = []
    pool.query(`select max(confirmed) from (select province_state,country_region,sum(confirmed) as confirmed,
	  sum(deaths) as deaths, sum(recovered) as recovered
	  from covid_daily_report group by country_region,province_state order by confirmed desc) as tbl`, null, (error, results) => {
      if (error) {
        throw error
      }
      max_val = results.rows[0].max

      // console.log(max_val);
    })
    
    pool.query(`select province_state,country_region, confirmed, deaths, recovered, lat as latitude, long_ as longitude
    from covid_daily_report where (long_ != 0.0 or lat != 0.0)
    and country_region != 'US'
	UNION
select province_state,country_region, confirmed, deaths, recovered, lat as latitude, long_ as longitude
    from covid_daily_report_us 
    where (long_ != 0.0 or lat != 0.0)
    and country_region = 'US'`, null, (error, results) => {
      if (error) {
        throw error
      }

      non_us_results = results.rows.map(row => {
        let radius = 15;
        let cal_radius = (row.confirmed/max_val)*50;
        // console.log(cal_radius);
        if (cal_radius > 20 )
          radius = (row.confirmed/max_val)*50
        else if( cal_radius > 5) {
          radius = 15
        }
        else {
          radius = 7
        }
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
          'world_location': non_us_results,
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

router.route('/timeseries-deaths-recovered').get((req, res) => {
  try{

    pool.query(`select category,TO_CHAR(TO_DATE(report_date, 'MM/dd/YY'),'MM-dd-YYYY') as report_date, sum(total) as total 
    from covid_timeseries_report 
    where category in ('deaths', 'recovered')
    group by category,report_date order by report_date;`, null, (error, results) => {
      if (error) {
        throw error
      }
      let res_death = []
      let res_recovered = []
      results.rows.map(row => {
        
        if(row.category == 'deaths') {
          res_death.push({
            category: row.category,
            report_date: row.report_date,
            total: parseInt(row.total)
          })
        }
        if(row.category == 'recovered') {
          res_recovered.push({
            category: row.category,
            report_date: row.report_date,
            total: parseInt(row.total)
          })
        }
        
      });

      res.status(200).json(
        { 
          'success': true,
          'timeseries_data':{
            deaths: res_death,
            recovered: res_recovered
          },
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

router.route('/us-daily-report').get((req, res) => {
  try{

    pool.query(`select province_state,sum(confirmed) as confirmed, sum(deaths) as deaths, sum(recovered) as recovered 
    from covid_daily_report_us where country_region = 'US' and upper(province_state) != upper('Recovered') 
    group by province_state order by confirmed desc;`, null, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'us_state_daily_report': results.rows,
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
