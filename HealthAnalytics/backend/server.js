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
//      3. npm install pg-format


//  Read the docs for the following packages:
//      1. https://node-postgres.com/
//      2.  result API:
//         https://node-postgres.com/api/result


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


const express = require('express');

const axios = require('axios');

var pg = require('pg');
const { Pool } = require('pg')

var bodyParser = require('body-parser');

// Connect to PostgreSQL server
//use default user name as postgres for the below

var conString = "pg://postgres:root@127.0.0.1:5432/uml_project";



var pgClient = new pg.Client(conString);
pgClient.connect();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'uml_project',
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


var exercise_category = [];
var places_found = [];
const API_KEY = 'AIzaSyCIgk-WnRPk3W6SMK7RKFlLvgMDG_WdWPw';


router.route('/exercise/category').get((req, res) => {

  try {
    const query = {
      name: 'fetch-exercise-category',
      text: 'select * from exercisecategory order by name'
    }

    find_exercise_category_from_wger(query).then(function (response) {
        res.json(
          {
            'success': true,
            'exercise_category': exercise_category,
          });
    });
  }
  catch(ex){
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/exercises/:id').get((req, res) => {
  try{
    var id = req.params.id;
    pool.query(`select * from exercise where 
    upper(name) not in('',upper('test'),upper('Abcd'),upper('Awesome'))
    and category=$1 and language=2 order by name;`, [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'exercises': results.rows,
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

router.route('/exercise/detail/:id').get((req, res) => {
  try{
    var id = req.params.id;

    pool.query(`select e.id,e.name,e.description,ec.name as ex_cat_name
    from exercise as e, exercisecategory as ec
    where e.category = ec.id
    and e. id=$1`, [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'exercise_detail': results.rows,
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

router.route('/search/fitness/:lat/:lng/:rad').get((req, res) => {
  try{  
    var lat = req.params.lat;
    var lng = req.params.lng;
    var rad = req.params.rad;  
    places_api(lat,lng,rad).then(function (response) {
        res.json(
          {
            'success': true,
            'search_result': places_found,
          });
    });
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

/*********************** START - ANALYTICS API **************************/
router.route('/analytics/category').get((req, res) => {
  try{

    pool.query(`select distinct class as option_value from chronic where class is not null;`,
     null, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'select_value': results.rows,
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

router.route('/analytics/year').get((req, res) => {
  try{

    pool.query(`select distinct yearstart as option_value from chronic where yearstart is not null order by option_value asc;`,
     null, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'select_value': results.rows,
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

router.route('/analytics/subview/:type').get((req, res) => {
  try{
    var type = req.params.type;
    let query = "select distinct "+ type +" as option_value from chronic where "+ type +" is not null order by option_value;";
    pool.query(query,null, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'select_value': results.rows,
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

function splitValues(left, right, parts) {
  var result = [];
  var val = right - left;
  var delta = val/parts;
  while (left < right) {
      result.push(parseFloat(left.toFixed(1)));
      left += delta;
  }
  result.push(parseFloat(right.toFixed(1)));
  return result;
}

router.route('/analytics/mapdata').get((req, res) => {
  try{

    let queryForlegendValRange = `select max(data_value) as max_val, min(data_value) as min_val
		                              from chronic
                                  where class = '`+ req.query.cat +`' 
                                  and yearstart = '`+req.query.year+`' and 
                                  `+req.query.type+` = '`+req.query.subtype+`';`;
    
    pool.query(queryForlegendValRange,null, (error, results) => {
      if (error) {
        throw error
      }
      
      var split_values = splitValues(parseFloat(results.rows[0].min_val),parseFloat(results.rows[0].max_val),4);
      
      let query = `select locationabbr, max(data_value) as data_value from chronic
                  where class = '`+ req.query.cat +`' 
                  and yearstart = '`+req.query.year+`' and `+req.query.type+` = '`+req.query.subtype+`' 
                  group by locationabbr
                  order by data_value ;`;
      
      pool.query(query,null, (error, results) => {
        if (error) {
          throw error
        }

        var map_data = {}
        var fill_key = {}
        var fillKey = split_values[0] + " - "+ (split_values[1]-0.1) ;
        fill_key[fillKey +""] = '#e5f4d7';
        fillKey = split_values[1] + " - "+ (split_values[2]-0.1) ;
        fill_key[fillKey + ""] = '#A0E5A9';
        fillKey = split_values[2] + " - "+ (split_values[3]-0.1) ;
        fill_key[fillKey+""] = '#62D2B4';
        fillKey = split_values[3] + " - "+ split_values[4] ;
        fill_key[fillKey+""] = '#2B8CBE';
        fillKey = 'defaultFill';
        fill_key[fillKey+""] = '#999999';
        console.log(fill_key)

        results.rows.map(row => {
          var fillKey = "";
          var location = row.locationabbr;
          if(parseInt(row.data_value) >= split_values[0] && parseInt(row.data_value) <= (split_values[1]-0.1) ) {
            fillKey = split_values[0] + " - "+ (split_values[1]-0.1) ;
            // fill_key.push({fillKey : '#e5f4d7'})
          } else if(parseInt(row.data_value) >= split_values[1] && parseInt(row.data_value) <= (split_values[2]-0.1) ) {
            // fillKey = '28.7 - 31.1';
            fillKey = split_values[1] + " - "+ (split_values[2]-0.1) ;
            // fill_key.push({fillKey : '#A0E5A9'})
          } else if(parseInt(row.data_value) >= split_values[2] && parseInt(row.data_value) <= (split_values[3]-0.1) ) {
            // fillKey = '31.2 - 33.6';
            fillKey = split_values[2] + " - "+ (split_values[3]-0.1) ;
            // fill_key.push({fillKey : '#62D2B4'})
          } else if(parseInt(row.data_value) >= split_values[3] && parseInt(row.data_value) <= split_values[4] ) {
            // fillKey = '33.7 - 40.6';
            fillKey = split_values[3] + " - "+ split_values[4] ;
            // fill_key.push({fillKey : '#2B8CBE'})
          } else {
            fillKey = 'defaultFill';
            // fill_key.push({fillKey : '#999999'})
          }
          var data = {
            fillKey: fillKey,
            electoralVotes: parseInt(row.data_value),
          };
        /*  var state_data = {
            location: data,
          }*/
          map_data[location] = data;
        })
        res.status(200).json(
          { 
            'success': true,
            'map_records': map_data,
            'fill_key': fill_key,
          });
      })
    });
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});


router.route('/analytics/barchart').get((req, res) => {
  try{

    let query = `select locationdesc as location, max(data_value) as data_value from chronic
                  where class = '`+ req.query.cat +`' 
                  and yearstart = '`+req.query.year+`' and `+req.query.type+` = '`+req.query.subtype+`' 
                  group by locationdesc
                  order by locationdesc ;`;
    pool.query(query,null, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'barchart_data': results.rows,
        }
      );
    });

  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/analytics/covid/prediction').get((req, res) => {
  try{

    let query = `select * from (select to_char(to_date(report_date,'yyyy-mm-dd hh24:mi:ss'),'mm-dd-yyyy') as report_date,
    total,data_type, category from health_analytics_covid_us_confirmed
Union
select to_char(to_date(report_date,'yyyy-mm-dd hh24:mi:ss'),'mm-dd-yyyy') as report_date,
    total,data_type, category from health_analytics_covid_us_deaths) as tbl order by report_date;
    `;
    //console.log(query);
    pool.query(query,null, (error, results) => {
      if (error) {
        throw error
      }

      let res_confirmed = []
      let res_confirmed_predict = []
      let res_deaths = []
      let res_deaths_predict = []

      results.rows.map(row => {
        
        if(row.category == 'confirmed' && row.data_type == 'actual') {
          res_confirmed.push({
            report_date: row.report_date,
            total: parseInt(row.total),
            data_type: row.data_type,
            category: row.category
          })
        }
        if(row.category == 'confirmed' && row.data_type == 'predicted') {
          res_confirmed_predict.push({
            report_date: row.report_date,
            total: parseInt(row.total),
            data_type: row.data_type,
            category: row.category
          })
        }

        if(row.category == 'death' && row.data_type == 'actual') {
          res_deaths.push({
            report_date: row.report_date,
            total: parseInt(row.total),
            data_type: row.data_type,
            category: row.category
          })
        }

        if(row.category == 'death' && row.data_type == 'predicted') {
          res_deaths_predict.push({
            report_date: row.report_date,
            total: parseInt(row.total),
            data_type: row.data_type,
            category: row.category
          })
        }
        
      });
      res.status(200).json(
        { 
          'success': true,
          'covid_data': {
            confirmed: res_confirmed,
            confirmed_predict: res_confirmed_predict,
            deaths: res_deaths,
            deaths_predict: res_deaths_predict
          },
        }
      );
    });

  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});


/*********************** END - ANALYTICS API **************************/

async function places_api(lat,lng,rad) {
  
  try {
    let url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key="+API_KEY+"&type=gym&location="+lat+","+lng+"&radius="+rad;
    let api_result = await axios.get(url)
    // console.log(api_result)
    places_found = []
    api_result.data.results.forEach(item => {
      // console.log(item);
      var place = {
        "formatted_address": item.formatted_address,
        "latitude": item.geometry.location.lat,
        "longitude": item.geometry.location.lng,
        "name": item.name,
        "photos_url": item.photos && item.photos.length > 0 ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+item.photos[0].photo_reference+ "&key="+API_KEY : '',
        "rating": item.rating,
        "total_user_rating": item.total_user_rating,
        "place_id": item.place_id,
      };
      places_found.push(place);
    });

  } catch (error) {
    console.error(error)
  }
}



async function find_exercise_category_from_wger(query) {
	const response = await pgClient.query(query);
  exercise_category = [];
    response.rows.forEach(element => {
      var exercise_cat = {
        "id": element.id,
        "name": element.name
      };

      exercise_category.push(exercise_cat);
    }); 
}



app.use('/', router);

app.listen(4000, () => {           
            console.log('--------------------------------------------------------');
            console.log('');
            console.log('Express server running on port 4000')
});
